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
    useFieldArray,
    useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question } from "../types/quiz";
import { Field, FieldError } from "@/shared/components/ui/field";
import { QuestionFormType, questionSchema } from "../schema/quiz.schema";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

type Props = {
    questions: Question[];
};

const QuestionForm = ({ questions }: Props) => {
    const form = useForm<QuestionFormType>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            type: "multiple_choice",
            text: "",
            grade: 1,
            correctAnswer: ""
        }
    });

    const type = form.watch("type");

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control: form.control,
        name: "choices"
    });

    return (
        <div className="grid grid-cols-[260px_1fr] gap-5">

            {/* sidebar */}
            <Card>
                <CardHeader>
                    <CardTitle>قائمة الأسئلة</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">

                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            className="rounded-md border p-3 cursor-pointer hover:bg-muted"
                        >
                            <p className="font-medium">
                                السؤال {index + 1}
                            </p>

                            <p className="text-sm text-muted-foreground truncate">
                                {q.question}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* form */}
            <Card>
                <CardHeader>
                    <CardTitle>إضافة سؤال</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* type */}

                    <Controller
                        name="type"
                        control={form.control}
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex gap-6"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="choice" />
                                    <span>اختيارات متعددة</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="true_false" />
                                    <span>صح وخطأ</span>
                                </div>
                            </RadioGroup>
                        )}
                    />

                    {/* question */}

                    <Controller
                        name="text"
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

                                    <Input {...field} />
                                </div>
                            </Field>
                        )}
                    />

                    {/* options */}

                    {type === "multiple_choice" && (
                        <>
                            <div className="space-y-4">

                                {fields.map((item, index) => (
                                    <Controller
                                        key={item.id}
                                        control={form.control}
                                        name={`choices.${index}`}
                                        render={({ field }) => (
                                            <div className="flex gap-3">
                                                <Input
                                                    placeholder={`الاختيار ${index + 1}`}
                                                    {...field}
                                                />

                                                {fields.length > 2 && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => remove(index)}
                                                    >
                                                        حذف
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                ))}

                            </div>

                            {fields.length < 4 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append("")}
                                >
                                    إضافة اختيار
                                </Button>
                            )}
                        </>
                    )}

                    {type === "true_false" && (
                        <Controller
                            name="correctAnswer"
                            control={form.control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex gap-5"
                                >
                                    <div className="flex gap-2 items-center">
                                        <RadioGroupItem value="true" />
                                        صح
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <RadioGroupItem value="false" />
                                        خطأ
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    )}

                    <Button>
                        حفظ السؤال
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
};

export default QuestionForm;