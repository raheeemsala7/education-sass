
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";

import { Input } from "@/shared/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { useCreateLinkLessonMutation, useCreateQuizLessonMutation } from "@/features/lesson/hooks/lesson.hook";
import { useRouter } from "next/navigation";
import { QuizCreateSchema } from "@/features/quiz/schema/quiz.schema";
import { QuizCreateType } from "@/features/quiz/types/quiz";


interface IProps {
    isEdit: Boolean;
    courseId: string;
    chapterId: number;
    assginment_id: string;
    setIsOpen: (open: boolean) => void;
    title: string;
    description: string;
}

const AssginmentLesson = ({
    isEdit = false,
    courseId,
    chapterId,
    assginment_id,
    setIsOpen,
    title,
    description,
}: IProps) => {
    const [isPending, startTransition] = useTransition();
    const { mutateAsync: createLesson } = useCreateQuizLessonMutation(courseId);
    const router = useRouter();

    const form = useForm<QuizCreateType>({
        resolver: zodResolver(QuizCreateSchema),
        defaultValues: {
            title: title || "",
            description: description || "",
            type: "assignment",
        },
    });

    console.log(form.formState.errors)

    function onSubmit(values: QuizCreateType) {
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

                } else {
                    const payload = await createLesson({
                        values,
                        chapterId
                    })
                    if (payload.status) {
                        toast.success("Quiz lesson created successfully");
                        // router.push(`/course/${courseId}/chapter/${chapterId}`);
                    }
                    setIsOpen(false);
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
            <Button type="submit" className="mr-auto mt-2" disabled={isPending}>
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

export default AssginmentLesson;