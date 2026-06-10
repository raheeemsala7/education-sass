"use client"
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import Link from 'next/link'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'
import { useDeleteCourseMutation } from '@/features/course/hooks/use-course'


const DeleteCourseRoute = () => {
    const [isPending, startTransition] = useTransition()
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const { mutateAsync } = useDeleteCourseMutation()


    console.log(id)


    function onSubmit() {
        startTransition(async () => {
            const payload = await mutateAsync(id)
            console.log(payload)
            toast.success(payload.message || "حذف المقرر بنجاح")
            router.push("/admin/courses")
        })
    }
    return (
        <div className='max-w-xl mx-auto w-full r'>
            <Card className='mt-32'>
                <CardHeader>
                    <CardTitle className='text-xl font-semibold'>هل أنت متأكد من حذف هذا المقرر؟</CardTitle>
                    <CardDescription>سيتم حذف هذا المقرر بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.</CardDescription>
                </CardHeader>

                <CardContent className='flex items-center justify-end gap-4'>
                    <Link className={buttonVariants({ variant: "outline" })} href={"/admin/courses"}>
                        إلغاء
                    </Link>

                    <Button onClick={onSubmit} variant={"destructive"} className='cursor-pointer' disabled={isPending}>
                        {isPending ?
                            <>
                                <Loader2 className='size-4 animate-spin' />
                                حذف...
                            </>
                            :
                            <>
                                <Trash2 className='size-4' />
                                حذف
                            </>

                        }
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default DeleteCourseRoute