
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";

import { Input } from "@/shared/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { QuizCreateType } from "../types/quiz";
import { QuizCreateSchema } from "../schema/quiz.schema";
import { useCreateLinkLessonMutation, useCreateQuizLessonMutation, useUpdateQuizLessonMutation } from "@/features/lesson/hooks/lesson.hook";
import { useRouter } from "next/navigation";


interface IProps {
    isEdit: Boolean;
    courseId: string;
    chapterId: number;
    quiz_id: string;
    setIsOpen: (open: boolean) => void;
    title: string;
    description: string;
}

const QuizLesson = ({
    isEdit = false,
    courseId,
    chapterId,
    quiz_id,
    setIsOpen,
    title,
    description,
}: IProps) => {
    const [isPending, startTransition] = useTransition();
    const { mutateAsync: createLesson } = useCreateQuizLessonMutation(courseId);
    const { mutateAsync: updateLesson } = useUpdateQuizLessonMutation(courseId);

    const form = useForm<QuizCreateType>({
        resolver: zodResolver(QuizCreateSchema),
        defaultValues: {           
            title: title || "",
            description: description || "",
            type: "quiz",
        },
    });

    console.log(quiz_id)

    function onSubmit(values: QuizCreateType) {
        startTransition(async () => {
            try {
                if (isEdit) {
                    if (
                        title === values.title &&
                        description === values.description 
                    ) {
                        setIsOpen(false);
                        return;
                    }

                    await updateLesson({
                        quiz_id,
                        values
                    });
                    toast.success("Lesson updated successfully");
                    form.reset();
                    setIsOpen(false);

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

export default QuizLesson;