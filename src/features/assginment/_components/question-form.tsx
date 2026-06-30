"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

import { Button } from "@/shared/components/ui/button";
import {
    Controller,
    FormProvider,
    useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { CheckCircle, Edit2, GripVertical, Loader2, Menu, Plus, SaveIcon, Trash2, Upload } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import UploadCreateMedia from "@/shared/components/file-uploader/upload-create-image";
import { useState } from "react";
import { uploadFileToS3 } from "@/shared/lib/uploadToS3";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";
import { Question } from "@/features/quiz/types/quiz";
import { QuestionFormType, questionSchema } from "@/features/quiz/schema/quiz.schema";
import ChoiceComponent from "@/features/quiz/_components/choice-component";
import { useAddQuestionToAssginmentMutation, useUpdateQuestionMutation } from "../hooks/assginment.hook";
import DeleteQuestionModal from "./delete-question-modal";

type Props = {
    questions: Question[];
    assginmentId: string;
};

const QuestionForm = ({ questions, assginmentId }: Props) => {
    const { mutateAsync: addQuestion, isPending: isPendingCreate } = useAddQuestionToAssginmentMutation(assginmentId)
    const { mutateAsync: updateQuestion, isPending: isPendingEdit } = useUpdateQuestionMutation(assginmentId)

    const form = useForm<QuestionFormType>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            type: "choice",
            question: "",
            grade: 1,
            correct_answer: "",
            options: [{ text: "" }],
            notes: "",
            question_image: "",
            answer_image: "",
            explanation: "",
        }
    });
    const type = form.watch("type");
    const [fileImageQuestion, setFileImageQuestion] = useState<File | null>(null);
    const [questionImagePreviewUrl, setQuestionImagePreviewUrl] = useState<string | undefined>();
    const [fileImageSolveQuestion, setFileImageSolveQuestion] = useState<File | null>(null);
    const [solveQuestionImagePreviewUrl, setSolveQuestionImagePreviewUrl] = useState<string | undefined>();
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

    const handleSelectQuestionImage = (file: File) => {
        setFileImageQuestion(file);
        setQuestionImagePreviewUrl(URL.createObjectURL(file));
        form.setValue("question_image", file, { shouldValidate: true });
    };

    const handleRemoveQuestionImage = () => {
        setFileImageQuestion(null);
        setQuestionImagePreviewUrl(undefined);
        form.setValue("question_image", "");
    };
    const handleSelectSolveQuestionImage = (file: File) => {
        setFileImageSolveQuestion(file);
        setSolveQuestionImagePreviewUrl(URL.createObjectURL(file));
        form.setValue("answer_image", file, { shouldValidate: true });
    };

    const handleRemoveSolveQuestionImage = () => {
        setFileImageSolveQuestion(null);
        setSolveQuestionImagePreviewUrl(undefined);
        form.setValue("answer_image", "");
    };


    const onSubmit = async (values: QuestionFormType) => {
        if (fileImageQuestion) {
            const imageUrl = await uploadFileToS3(fileImageQuestion as File);
            values.question_image = imageUrl;
        }
        if (fileImageSolveQuestion) {
            const solveImageUrl = await uploadFileToS3(fileImageSolveQuestion as File);
            values.answer_image = solveImageUrl;
        }
        if (editingQuestionId) {
            try {
                const data = await updateQuestion({
                    assginmentId: editingQuestionId,
                    values,
                })
                if (data.status) {
                    toast.success("Question updated successfully");
                    form.reset({
                        type: "choice",
                        question: "",
                        grade: 1,
                        correct_answer: "",
                        options: [{ text: "" }],
                        notes: "",
                        question_image: "",
                        answer_image: "",
                        explanation: "",
                    });
                    setEditingQuestionId(null);
                    setFileImageSolveQuestion(null)
                    setFileImageQuestion(null)
                    setQuestionImagePreviewUrl("")
                    setSolveQuestionImagePreviewUrl("")
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } else {
            try {
                const data = await addQuestion({
                    values,
                    assginmentId
                })
                if (data.status) {
                    toast.success("Question added successfully");
                    form.reset({
                        type: "choice",
                        question: "",
                        grade: 1,
                        correct_answer: "",
                        options: [{ text: "" }],
                        notes: "",
                        question_image: "",
                        answer_image: "",
                        explanation: "",
                    });
                    setFileImageSolveQuestion(null)
                    setFileImageQuestion(null)
                    setQuestionImagePreviewUrl("")
                    setSolveQuestionImagePreviewUrl("")
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="grid  grid-cols-1 sm:grid-cols-[290px_1fr] gap-5 w-full">

            {/* sidebar */}
            <Card className="sm:h-80 overflow-y-auto">
                <CardHeader>
                    <CardTitle>قائمة الأسئلة</CardTitle>
                    <Button onClick={() => {
                        form.reset({
                            type: "choice",
                            question: "",
                            grade: 1,
                            correct_answer: "",
                            options: [{ text: "" }],
                            notes: "",
                            question_image: "",
                            answer_image: "",
                            explanation: "",
                        });
                        setFileImageSolveQuestion(null);
                        setSolveQuestionImagePreviewUrl(undefined);
                        setFileImageQuestion(null);
                        setQuestionImagePreviewUrl(undefined);
                        setEditingQuestionId(null);
                    }}>إضافة سؤال جديد</Button>
                </CardHeader>

                <CardContent className="space-y-3 ">

                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            className="rounded-md border p-2 cursor-pointer hover:bg-muted"
                        >
                            <div className="flex gap-1.5 items-start">
                                <GripVertical className="size-4 " />

                                <span className="bg-primary size-5 text-xs flex justify-center items-center rounded-full text-white">
                                    {index + 1}
                                </span>

                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground truncate">
                                        {q.question}
                                    </p>

                                    <div className="flex  gap-1.5">
                                        <Badge className="text-xs">{q.type === "choice" ? "اختيار من متعدد" : "صح وخطأ"}</Badge>
                                        <Badge className="text-xs bg-green-100 text-green-600" variant={"secondary"}>{q.grade} درجة</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-1.5 items-center mt-4">
                                <DeleteQuestionModal assginmentId={assginmentId} questionId={q.id.toString()} />
                                <Button size={"icon"} variant={"ghost"} onClick={() => {
                                    setEditingQuestionId(q.id.toString());
                                    form.reset({
                                        type: q.type,
                                        question: q.question,
                                        question_image: q.question_image ?? "",
                                        answer_image: q.answer_image ?? "",
                                        correct_answer: q.correct_answer,
                                        grade: Number(q.grade),
                                        explanation: q.explanation,
                                        notes: q.notes,
                                        options: q.options.map((opt) => ({ text: opt })),
                                    })
                                    setSolveQuestionImagePreviewUrl(q.answer_image);
                                    setQuestionImagePreviewUrl(q.question_image);
                                }}>
                                    <Edit2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* form */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>إضافة سؤال</CardTitle>
                </CardHeader>

                <CardContent>
                    <FormProvider {...form}>
                        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                            {/* type */}
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex items-center gap-6"
                                    >
                                        <div
                                            onClick={() => field.onChange("choice")}
                                            className={cn(
                                                "flex items-center justify-between flex-1 p-4 py-2 rounded-xl border-2 cursor-pointer transition",
                                                field.value === "choice"
                                                    ? "border-[#2563EB]"
                                                    : "border-gray-200"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(" p-2 rounded-md",
                                                    field.value === "choice" ? "bg-[#DBEAFE] text-blue-600" : "bg-[#F3F4F6] text-[#9CA3AF]"
                                                )}>
                                                    <Menu className=" size-5" />
                                                </div>

                                                <div>
                                                    <h6 className="font-bold">اختيار من المتعدد</h6>
                                                    <p className="text-[#9CA3AF]">
                                                        سؤال يحتوي على خيارات متعددة
                                                    </p>
                                                </div>
                                            </div>

                                            <RadioGroupItem value="choice" />
                                        </div>
                                        <div
                                            onClick={() => field.onChange("true_false")}
                                            className={cn(
                                                "flex items-center justify-between flex-1 p-4 py-2 rounded-xl border-2 cursor-pointer transition",
                                                field.value === "true_false"
                                                    ? "border-[#2563EB]"
                                                    : "border-gray-200"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(" p-2 rounded-md",
                                                    field.value === "true_false" ? "bg-[#DBEAFE] text-blue-600" : "bg-[#F3F4F6] text-[#9CA3AF]"
                                                )}>
                                                    <CheckCircle className=" size-5" />
                                                </div>

                                                <div>
                                                    <h6 className="font-bold">صح وخطأ</h6>
                                                    <p className="text-[#9CA3AF]">
                                                        سؤال بإجابة صحيحة أو خاطئة فقط
                                                    </p>
                                                </div>
                                            </div>

                                            <RadioGroupItem value="true_false" />
                                        </div>


                                    </RadioGroup>
                                )}
                            />

                            {/* question */}

                            <Controller
                                name="question"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>

                                        <div>
                                            <label className="block mb-3">
                                                نص السؤال
                                            </label>

                                            <Input {...field} />
                                        </div>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* grade */}
                                <Controller
                                    name="grade"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <div>
                                                <label className="block mb-3">
                                                    الدرجة
                                                </label>

                                                <Input type="number" {...field} />
                                            </div>
                                        </Field>
                                    )}
                                />
                                {/* Notes */}
                                <Controller
                                    name="notes"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <div>
                                                <label className="block mb-3">
                                                    ملاحظات إضافية حول هذا السؤال...
                                                </label>
                                                <Input
                                                    {...field} />
                                            </div>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}

                                        </Field>
                                    )}
                                />
                            </div>

                            <Controller
                                name="question_image"
                                control={form.control}
                                render={({ fieldState }) => (
                                    <Field>
                                        <FieldLabel> صورة السؤال </FieldLabel>
                                        <UploadCreateMedia
                                            height="h-42"
                                            mediaType="image"
                                            previewUrl={questionImagePreviewUrl}
                                            onSelect={handleSelectQuestionImage}
                                            onRemove={handleRemoveQuestionImage}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            {/* options */}
                            {type === "choice" && (
                                <ChoiceComponent />
                            )}

                            {type === "true_false" && (
                                <>
                                    <Controller
                                        name="correct_answer"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <label className="block mb-3 font-semibold">
                                                    الخيارات
                                                </label>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="grid grid-cols-2 gap-4 mt-0"
                                                >
                                                    <div
                                                        onClick={() => field.onChange("true")}
                                                        className={cn(
                                                            "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition",
                                                            field.value === "true"
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border"
                                                        )}
                                                    >
                                                        <RadioGroupItem value="true" />
                                                        <span>صح</span>
                                                    </div>

                                                    <div
                                                        onClick={() => field.onChange("false")}
                                                        className={cn(
                                                            "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition",
                                                            field.value === "false"
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border"
                                                        )}
                                                    >
                                                        <RadioGroupItem value="false" />
                                                        <span>خطأ</span>
                                                    </div>
                                                </RadioGroup>

                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </div>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <Controller
                                            name="notes"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <div>
                                                        <label className="block mb-3">
                                                            ملاحظات إضافية حول هذا السؤال...
                                                        </label>
                                                        <Input
                                                            {...field} />
                                                    </div>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}

                                                </Field>
                                            )}
                                        />

                                    </div>
                                </>
                            )}
                            {/* Explanation */}
                            <Controller
                                name="explanation"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <div>
                                            <label className="block font-medium mb-3">
                                                شرح حل هذا السؤال
                                            </label>
                                            <Textarea
                                                placeholder="اكتب حل هذا السؤال"
                                                rows={6}
                                                {...field} />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            />

                            <Controller
                                name="answer_image"
                                control={form.control}
                                render={({ fieldState }) => (
                                    <Field>
                                        <FieldLabel> صورة لحل السؤال </FieldLabel>
                                        <UploadCreateMedia
                                            height="h-42"
                                            mediaType="image"
                                            previewUrl={solveQuestionImagePreviewUrl}
                                            onSelect={handleSelectSolveQuestionImage}
                                            onRemove={handleRemoveSolveQuestionImage}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <div className="mr-auto w-fit space-x-3">
                                <Button variant={"secondary"}>
                                    الغاء
                                </Button>
                                <Button type="submit" disabled={!editingQuestionId ? isPendingEdit : isPendingCreate}>
                                    {isPendingCreate || isPendingEdit  ?
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>
                                                حفظ السؤال
                                            </span>
                                        </>
                                        :
                                        <span>
                                            حفظ السؤال
                                        </span>
                                    }
                                    <SaveIcon />
                                </Button>
                            </div>

                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuestionForm;