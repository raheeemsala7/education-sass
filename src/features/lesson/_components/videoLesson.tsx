import UploadCreateMedia from "@/shared/components/file-uploader/upload-create-image";
import { Button } from "@/shared/components/ui/button";

import { Input } from "@/shared/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { useBlockNavigation } from "@/shared/hooks/useBlockNavigation";
import { usePreventLeave } from "@/shared/hooks/usePreventLeave";

import { useLessonUploadStore } from "@/store/useLessonUploadStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { uploadVideoLessonSchema, videoLessonSchema } from "../schema/lesson.schema";
import { UpdateVideoLessonType, VideoLessonType } from "../types/lesson";
import { useCreateLessonVideoMutation, useUpdateLessonVideoMutation } from "../hooks/lesson.hook";
import { uploadFileToS3 } from "@/shared/lib/uploadToS3";

interface IProps {
    courseId: string;
    lessonId?: number;
    chapterId: number;
    setIsOpen: (open: boolean) => void;
    title: string;
    type: string;
    video_url: string;
    content: string;
    description: string;
    isEdit: boolean;
}

export const VideoLesson = ({
    courseId,
    chapterId,
    lessonId,
    setIsOpen,
    title,
    content,
    description,
    type,
    video_url,
    isEdit,
}: IProps) => {

    const isUploading = useLessonUploadStore(
        (state) => Object.keys(state.uploads).length > 0,
    );

    usePreventLeave(isUploading);
    useBlockNavigation(isUploading);

    const [currentStep, setCurrentStep] = useState(1);
    const [lessonIdFake, setLessonIdFake] = useState<string>("")

    const [isPending, startTransition] = useTransition();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | undefined>(video_url);

    const handleSelect = (selectedFile: File) => {
        if (!selectedFile) return;
        const localPreview = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreview(localPreview);

        formStep2.setValue("video_url", localPreview, {
            shouldValidate: true,
        });
    };

    const handleRemove = () => {
        if (preview) URL.revokeObjectURL(preview);

        setFile(null);
        setPreview(undefined);

        formStep2.setValue("content", "");
    };

    const { startUpload, setProgress, setReady } =
        useLessonUploadStore.getState();

    const { mutateAsync: createLesson } = useCreateLessonVideoMutation(
        courseId,
    );
    const { mutateAsync: updateLesson } = useUpdateLessonVideoMutation(courseId);

    const formStep1 = useForm<VideoLessonType>({
        resolver: zodResolver(videoLessonSchema),
        defaultValues: {
            title: title || "",
            type: type || "video",
            description: description || "",
        },
    });
    const formStep2 = useForm<UpdateVideoLessonType>({
        resolver: zodResolver(uploadVideoLessonSchema),
        defaultValues: {
            video_url: video_url || "",
        },
    });

    function onSubmitStep1(values: VideoLessonType) {
        startTransition(async () => {
            try {
                if (isEdit) {
                    if (title === values.title && description === values.description) {
                        setCurrentStep(2)
                        return
                    }
                } else {
                    const payload = await createLesson({
                        values,
                        chapterId
                    })

                    if (payload.status) {
                        setLessonIdFake(payload.data.id.toString())
                        setCurrentStep(2)
                        toast.success("Lesson created successfully")
                        formStep1.reset()
                    }


                }

                // if (title === values.title && description === values.description) {
                //     setCurrentStep(2);
                //     return;
                // }
                // toast.success("Lesson created successfully");
                // formStep1.reset();
                // setCurrentStep(2);
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        });
    }
    function onSubmitStep2() {
        startTransition(async () => {
            try {
                setIsOpen(false);

                if (isEdit) {
                    if (file === null) {
                        setIsOpen(false);
                        return
                    }
                } else {
                    startUpload(lessonIdFake);

                    // 1. تحميل الفيديو إلى S3
                    const videoUrl = await uploadFileToS3(file, (p) => {
                        setProgress(lessonIdFake, p);
                    });
                    if (!videoUrl) {
                        toast.error("Failed to upload video. Please try again.");
                        return;
                    }

                    // 2. تحديث الدرس
                    await updateLesson({
                        lessonId: parseInt(lessonIdFake),
                        values: {
                            video_url: videoUrl,
                            type: "video"
                        }
                    });

                    formStep2.reset();

                    toast.success("Lesson updated successfully");
                    setReady(lessonIdFake);
                }
                // setIsOpen(false)
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        });
    }

    return (
        <div>
            <div className="flex items-center justify-center mb-4">
                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= 1
                            ? "bg-primary border-prbg-primary text-white"
                            : "border-gray-300 text-gray-300"
                            }`}
                    >
                        {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                    </div>
                    <div className="text-xs mr-2 ml-2">إنشاء الدرس</div>
                </div>

                <div
                    className={`w-16 h-1 mx-4 ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`}
                ></div>

                <div className="flex items-center">
                    <div className="text-xs ml-2 mr-2">تحديث الكورس</div>
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= 2
                            ? "bg-primary border-prbg-primary text-white"
                            : "border-gray-300 text-gray-300"
                            }`}
                    >
                        2
                    </div>
                </div>
            </div>

            {currentStep === 1 ? (
                <>
                    <form
                        onSubmit={formStep1.handleSubmit(onSubmitStep1)}
                        className="space-y-4 flex flex-col"
                    >
                        <Controller
                            name="title"
                            control={formStep1.control}
                            render={({ field, fieldState }) => (
                                <Field>

                                    <FieldLabel> العنوان </FieldLabel>
                                    <Input placeholder="عنوان الدرس" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={formStep1.control}
                            render={({ field, fieldState }) => (
                                <Field>

                                    <FieldLabel> الوصف </FieldLabel>
                                    <Textarea placeholder="وصف الدرس" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button type="submit" className="mr-auto mt-2">

                            {isPending ? (
                                <>

                                    جاري الحفظ <Loader2 className="animate-spin" />
                                </>
                            ) : (
                                <>تحديث الدرس</>
                            )}
                        </Button>
                    </form>
                </>
            ) : (
                <>
                    <form
                        onSubmit={formStep2.handleSubmit(onSubmitStep2)}
                        className="space-y-4 flex flex-col"
                    >

                        <Controller
                            name="video_url"
                            control={formStep2.control}
                            render={({ fieldState }) => (
                                <Field>

                                    <FieldLabel> فيديو الدرس </FieldLabel>
                                    <UploadCreateMedia
                                        mediaType="video"
                                        previewUrl={preview}
                                        onSelect={handleSelect}
                                        onRemove={handleRemove}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button type="submit" className="mr-auto mt-2">

                            تحديث الفيديو
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};
