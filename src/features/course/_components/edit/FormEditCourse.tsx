"use client"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Loader2, PlusIcon, SparkleIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
// import UploaderImage from "@/components/file-uploader/uploader-image"
// import UploadCreateMedia from "@/components/file-uploader/upload-create-image"
import { courseSchema } from "../../schema/course.schema"
import { CourseSchemaType } from "../../types/course"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import Editor from "@/shared/components/rich-text-editor/Editor"
import UploadCreateMedia from "@/shared/components/file-uploader/upload-create-image"
import { useConstructUrl } from "@/shared/hooks/use-construct-url"
import { useConfetti } from "@/shared/hooks/use-confetti"



interface IProps {
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    is_free: boolean;
    is_active: boolean;
    category: "الصف الأول الثانوي" | "الصف الثاني الثانوي" | "الصف الثالث الثانوي";
    id: string;
}



const FormEditCourse = ({ title, id, description, thumbnail, price, is_free, category, is_active }: IProps) => {

    const { triggerConfetti } = useConfetti()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: title,
            description: description,
            thumbnail: thumbnail,
            price: price,
            is_free: is_free,
            // category: category,
            // is_active: is_active,
            // smallDescription: "",
        },
    })

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | undefined>();

    const handleSelect = (file: File) => {
        const localPreview = URL.createObjectURL(file);
        setFile(file);
        setPreview(localPreview);
        form.setValue("thumbnail", localPreview, {
            shouldValidate: true,
        });
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(undefined);
        form.setValue("thumbnail", "");

    };

    useEffect(() => {
        form.reset({
            title,
            description,
            thumbnail,
            price,
            is_free,
        })

        setPreview(thumbnail)
        setFile(null)
    }, [title, description, thumbnail, price, is_free])


    const { mutateAsync: updateCourse } = useUpdateCourseMutation()



    const uploadImageToS3 = async (file: File): Promise<string> => {
        try {
            // 1. احصل على presigned URL
            const presignedResponse = await fetch("/api/s3/upload", {
                method: "POST",
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!presignedResponse.ok) {
                throw new Error("Failed to get presigned URL");
            }

            const { key, presignedUrl } = await presignedResponse.json();

            // 2. ارفع الملف على S3 باستخدام XMLHttpRequest
            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentageCompleted = (event.loaded / event.total) * 100;
                        console.log(`Upload progress: ${Math.round(percentageCompleted)}%`);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        resolve();
                    } else {
                        reject(new Error(`Upload failed with status: ${xhr.status}`));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error("Upload failed"));
                };

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader('Content-Type', file.type);
                // مهم: لا تضيف headers إضافية غير Content-Type
                xhr.send(file);
            });

            return useConstructUrl(key);
        } catch (error) {
            console.error("Upload error:", error);
            throw new Error("فشل رفع الصورة");
        }
    };


    // 2. Define a submit handler.
    async function onSubmit(values: CourseSchemaType) {
        try {

            startTransition(async () => {


                // 1. Upload thumbnail if exists
                let thumbnailUrl = values.thumbnail;
                if (file) {
                    thumbnailUrl = await uploadImageToS3(file);
                }

                await updateCourse({ id: id, ...values, thumbnail: thumbnailUrl })

                toast.success("تم الانشاء بنجاح")
                triggerConfetti()
                router.push(`/admin/courses`)
                setFile(null)
                setPreview(undefined)
            })

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>العنوان</FieldLabel>

                        <Input
                            placeholder="عنوان الكورس"
                            {...field}
                        />

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="is_free"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>هل الكورس مجاني؟</FieldLabel>

                            <Select
                                value={field.value ? "true" : "false"}
                                onValueChange={(value) =>
                                    field.onChange(value === "true")
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="اختر القيمة" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="true">
                                        نعم
                                    </SelectItem>

                                    <SelectItem value="false">
                                        لا
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>السعر</FieldLabel>

                            <Input
                                type="number"
                                placeholder="السعر"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value === ""
                                            ? undefined
                                            : Number(e.target.value)
                                    )
                                }
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>وصف الكورس كامل</FieldLabel>

                        <Editor field={field} />

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="thumbnail"
                control={form.control}
                render={({ fieldState }) => (
                    <Field>
                        <FieldLabel>صورة غلاف الكورس</FieldLabel>

                        <UploadCreateMedia
                            mediaType="image"
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

            <Button
                type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" />
                        جاري الانشاء...
                    </>
                ) : (
                    <>
                        <PlusIcon />
                        انشاء الكورس
                    </>
                )}
            </Button>
        </form>
    )
}

export default FormEditCourse