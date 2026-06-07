import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { useUpdateChapterMutation } from '@/shared/hooks/use-course'
import { chapterSchema, ChapterSchemaType } from '@/shared/lib/schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PencilIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ChapterModal = ({ courseId ,chapterId , title , description }: { courseId: string , chapterId: number , title: string , description?: string }) => {
    const [isPending, startTransition] = useTransition()

    const [isOpen, setIsOpen] = useState(false)
    const { mutate: updateChapter } = useUpdateChapterMutation(courseId , chapterId)


    const form = useForm<ChapterSchemaType>({
        resolver: zodResolver(chapterSchema),
        defaultValues: {
            title: title ,
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
                await updateChapter(values)
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

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField control={form.control} name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العنوان</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Chapter Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الوصف</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Chapter Description' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type='submit' disabled={isPending}>

                                {isPending ?
                                    <>
                                        جاري الحفظ...
                                        <Loader2 className='size-4 animate-spin' />
                                    </>
                                    : (
                                        <>
                                            تحديث التغيرات 
                                        </>
                                    )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default ChapterModal