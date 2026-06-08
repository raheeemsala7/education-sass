import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
// import { useUpdateChapterMutation } from '@/shared/hooks/use-course'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PencilIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { chapterSchema } from '../schema/chapter.schema'
import { ChapterSchemaType } from '../types/chapter'
import { useUpdateChapterMutation } from '../hooks/chapter.hook'

const ChapterModal = ({ courseId, chapterId, title, description }: { courseId: string, chapterId: number, title: string, description?: string }) => {
    const [isPending, startTransition] = useTransition()

    const [isOpen, setIsOpen] = useState(false)
    const { mutate: updateChapter } = useUpdateChapterMutation(courseId)


    const form = useForm<ChapterSchemaType>({
        resolver: zodResolver(chapterSchema),
        defaultValues: {
            title: title,
            description: description || '',
        },
    })

    function handleOpenChange(open: boolean) {
        if (!open) {
            form.reset()
        }
        setIsOpen(open)
    }

    function onSubmit(values: ChapterSchemaType) {
        startTransition(async () => {

            try {
                await updateChapter({
                    chapterId,
                    ...values
                })
                toast.success("Chapter updated successfully")
                // form.reset()
                setIsOpen(false)
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.")

            }


        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button variant="outline" size={"sm"} className='gap-2'>
                    <PencilIcon className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className=" w-full sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>تغير اسم القسم ؟</DialogTitle>
                    <DialogDescription>يرجى إدخال اسم القسم الجديد</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>العنوان</FieldLabel>

                                <Input
                                    placeholder="Chapter Name"
                                    {...field}
                                />

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
                                <FieldLabel>الوصف</FieldLabel>

                                <Textarea
                                    placeholder="Chapter Description"
                                    {...field}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    جاري الحفظ...
                                    <Loader2 className="size-4 animate-spin" />
                                </>
                            ) : (
                                <>تحديث التغيرات</>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default ChapterModal