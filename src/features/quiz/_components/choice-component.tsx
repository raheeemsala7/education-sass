import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { QuestionFormType } from '../schema/quiz.schema';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Field, FieldError } from '@/shared/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

const ChoiceComponent = () => {

    const form = useFormContext<QuestionFormType>();

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const options = form.watch("options");

    return (
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
                                        checked={form.watch("correct_answer") === field.value as string}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                form.setValue("correct_answer", field.value as string);
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
                        append({ text: "" })
                    }}
                >
                    <span> إضافة اختيار</span>
                    <Plus className="size-4" />
                </Button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                    name="correct_answer"
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
    )
}

export default ChoiceComponent