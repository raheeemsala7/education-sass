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
import { CheckCircle, Menu, Plus, Trash2, Upload } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";

type Props = {
    questions: Question[];
};

const QuestionForm = ({ questions }: Props) => {
    const form = useForm<QuestionFormType>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            type: "choice",
            text: "",
            grade: 1,
            correctAnswer: "",
            options: [{ text: "" }],
        }
    });

    const type = form.watch("type");

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const options = form.watch("options");

    console.log(options)

    return (
        <div className="grid grid-cols-[260px_1fr] gap-5 w-full">

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
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>إضافة سؤال</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Controller
                            name="imageUrl"
                            control={form.control}
                            render={({ fieldState }) => (
                                <Field>
                                    <div>
                                        <label className="block mb-3">
                                            إضافة صورة للسؤال (اختياري)
                                        </label>

                                        <label
                                            htmlFor="question-image"
                                            className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] cursor-pointer hover:bg-slate-50 transition"
                                        >
                                            <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center">
                                                <Upload className="size-3 text-slate-500" />
                                            </div>

                                            <div className="text-center">
                                                <p className="font-medium text-sm">
                                                    اضغط لرفع صورة
                                                </p>
                                            </div>
                                        </label>

                                        <Input
                                            id="question-image"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                // هنا ترفع الصورة أو تخزنها في state
                                            }}
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                    </div>

                    {/* options */}

                    {type === "choice" && (
                        <>
                            <div>
                                <label className="text-base font-bold mb-2 block">الخيارات</label>
                                <div className="space-y-4">

                                    {fields.map((item, index) => (
                                        <Controller
                                            key={item.id}
                                            control={form.control}
                                            name={`options.${index}.text`}
                                            render={({ field }) => (
                                                <div className="flex gap-3">
                                                    <Checkbox
                                                        checked={form.watch("correctAnswer") === field.value as string}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                form.setValue("correctAnswer", field.value as string);
                                                            }   
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder={`الاختيار ${index + 1}`}
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        size={"icon-lg"}
                                                        variant="destructive"
                                                        onClick={() => {
                                                            remove(index)
                                                            form.resetField(`options.${index}`)
                                                        }}
                                                    >
                                                        <Trash2 className="size-5" />
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    ))}

                                </div>
                            </div>

                            {fields.length < 4 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={"w-full border-dashed bg-transparent border-2 border-primary text-primary"}
                                    onClick={() => {
                                        console.log("Clicked")
                                        append({ text : "" })
                                    }}
                                >
                                   <span> إضافة اختيار</span>
                                   <Plus className="size-4" />
                                </Button>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Controller
                                    name="correctAnswer"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <label className="block mb-3">الإجابة الصحيحة</label>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="اختر الإجابة الصحيحة" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {options!.map((opt, index) => (
                                                        <SelectItem key={index} value={opt.text}>
                                                            {opt.text}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                            </div>
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