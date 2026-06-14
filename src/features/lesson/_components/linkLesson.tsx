
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";

import { Input } from "@/shared/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { LinkLessonType, VideoLessonType } from "../types/lesson";
import { linkLessonSchema, videoLessonSchema } from "../schema/lesson.schema";
import { useCreateLessonVideoMutation, useCreateLinkLessonMutation } from "../hooks/lesson.hook";

interface IProps {
    isEdit: Boolean;
    courseId: string;
    chapterId: number;
    lessonId: number;
    setIsOpen: (open: boolean) => void;
    title: string;
    description: string;
    live_url: string;
    type: string;
}

const LinkLesson = ({
    isEdit = false,
    courseId,
    chapterId,
    lessonId,
    setIsOpen,
    title,
    description,
    type,
    live_url
}: IProps) => {
    const [isPending, startTransition] = useTransition();
    const { mutateAsync: createLesson } = useCreateLinkLessonMutation(courseId);
    // const { mutate: updateLesson } = useUpdateLessonVideoMutation(
    //     courseId,
    //     String(lessonId),
    // );


    console.log("live_url :" , live_url)
    const form = useForm<LinkLessonType>({
        resolver: zodResolver(linkLessonSchema),
        defaultValues: {
            title: title || "",
            description: description || "",
            live_url: live_url || "",
            type: "live",
        },
    });

    console.log(form.formState.errors)

    function onSubmit(values: LinkLessonType) {
        console.log(values)
        startTransition(async () => {
            try {
                if (isEdit) {
                    // if (
                    //     title === values.title &&
                    //     description === values.description &&
                    //     content === values.content
                    // ) {
                    //     setIsOpen(false);
                    //     return;
                    // }

                    // await updateLesson(values);
                    // toast.success("Lesson updated successfully");
                    // form.reset();
                    // setIsOpen(false);

                    console.log("first")
                } else {
                    const payload = await createLesson({
                        values,
                        chapterId
                    })
                    setIsOpen(false);
                    // toast.success("Lesson created successfully");
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        });
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
        >
            <Controller
                name="title"
                control={form.control}
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
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>

                        <FieldLabel> (اختياري) الوصف </FieldLabel>
                        <Textarea placeholder="وصف الدرس" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="live_url"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>

                        <FieldLabel> اللينك </FieldLabel>
                        <Input placeholder="اللينك" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Button type="submit" className="mr-auto mt-2">

                {isPending ? (
                    <>

                        جاري الحفظ <Loader2 className="size-4 animate-spin" />
                    </>
                ) : (
                    <> تحديث الدرس </>
                )}
            </Button>
        </form>
    );
};

export default LinkLesson;
