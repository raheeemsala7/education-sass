"use client"
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { assginmentInfoSchema } from '../schema/assginment.schema'
import { Field, FieldError } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Switch } from '@/shared/components/ui/switch'
import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { toast } from 'sonner'
import { AssginmentInfoType } from '../types/assginment'

interface IProps {
    title: string;
    description: string;
    total_grade: number;
    countQuestions: number;
    assginmentId: string;
    courseId: string;
}
const AssginmentInfoForm = ({ title, description, total_grade, countQuestions, assginmentId, courseId, }: IProps) => {
    // const { mutateAsync, isPending } = useUpdateQuizMutation({ assginmentId, courseId })
    const form = useForm<AssginmentInfoType>({
        resolver: zodResolver(assginmentInfoSchema),
        defaultValues: {
            title,
            description,
        }
    })

    const onSubmit = async (values: AssginmentInfoType) => {
        try {
            // await mutateAsync({
            //     values,
            //     quizId
            // })
            toast.success("Quiz info updated successfully")
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.")
        }
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

            <div className='flex justify-end'>
                <Button type="submit" className="mr-auto mt-4 bg-[#126870] text-white px-3 py-2 rounded-lg" >
                    {/* {isPending ? (
                        <>
                            جاري الحفظ <Loader2 className="size-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            <span>حفظ ومتابعة للأسئلة</span>
                            <ArrowLeft />
                            </>
                            )} */}
                            <span>حفظ ومتابعة للأسئلة</span>
                </Button>
            </div>
        </form>
    )
}

export default AssginmentInfoForm