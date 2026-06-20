"use client"
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { quizInfoSchema } from '../schema/quiz.schema'
import { QuizInfoType } from '../types/quiz'
import { Field, FieldError } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Switch } from '@/shared/components/ui/switch'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface IProps {
    title: string;
    description: string;
    duration: number;
    total_grade: number;
    countQuestions: number;
}
const QuizInfoForm = ({ title, description, duration, total_grade, countQuestions }: IProps) => {
    const isPending = false

    const form = useForm<QuizInfoType>({
        resolver: zodResolver(quizInfoSchema),
        defaultValues: {
            title,
            description,
            duration: duration ?? 60,
            settings: {
                randomizeQuestions: true,
                randomizeChoices: false,
                showResultImmediately: false,
                allowReview: false,
                maxAttempts: '1',
                startDate: '',
            }
        }
    })

    const onSubmit = (values: QuizInfoType) => {

    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full">
                <CardHeader>
                    معلومات الامتحان الاساسيه
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                        <Controller
                            name='title'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div>
                                        <label className='block mb-3'>
                                            العنوان
                                        </label>
                                        <Input
                                            className="bg-[#F8FAFC] border border-[#E2E8F0]"
                                            placeholder=" "
                                            {...field}
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="text-red-500"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='duration'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div>
                                        <label className='block mb-3'>
                                            العنوان
                                        </label>
                                        <Input
                                            type='number'
                                            className="bg-[#F8FAFC] border border-[#E2E8F0]"
                                            placeholder=""
                                            {...field}
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="text-red-500"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        name='description'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div>
                                    <label className='block mb-3'>
                                        الوصف
                                    </label>
                                    <Textarea

                                        className="bg-[#F8FAFC] border border-[#E2E8F0] h-28"
                                        placeholder=" "
                                        {...field}
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError
                                        className="text-red-500"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                        <div className='flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg'>
                            <div className='text-[#334155] font-semibold'>
                                عدد الأسئلة
                            </div>
                            <p className='font-semibold'>{countQuestions}</p>
                        </div>
                        <div className='flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg'>
                            <div className='text-[#334155] font-semibold'>
                                الدرجة الكلية
                            </div>
                            <p className='font-semibold'>{total_grade}</p>
                        </div>


                    </div>
                </CardContent>
            </Card>
            <Card className="w-full mt-6">
                <CardHeader className='text-center text-base font-semibold'>
                    إعدادات الامتحان
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                        <Controller
                            name='settings.randomizeQuestions'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <h6 className='font-bold text-base '>عشوائية ترتيب الأسئلة</h6>
                                            <p className='text-[#94A3B8]'>عرض الأسئلة بترتيب عشوائي لكل طالب</p>
                                        </div>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError 
                                            className="text-red-500"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='settings.randomizeChoices'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <h6 className='font-bold text-base'>عشوائية ترتيب الأسئلة</h6>
                                            <p className='text-[#94A3B8]'>عرض الأسئلة بترتيب عشوائي لكل طالب</p>
                                        </div>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            className="text-red-500"
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className='flex justify-end'>
                <Button type="submit" className="mr-auto mt-4 bg-[#126870] text-white px-3 py-2 rounded-lg" disabled={isPending}>
                    {isPending ? (
                        <>
                            جاري الحفظ <Loader2 className="size-4 animate-spin" />
                        </>
                    ) : (
                        <> 
                        <span>حفظ ومتابعة للأسئلة</span>
                        <ArrowLeft />
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}

export default QuizInfoForm