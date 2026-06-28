import { RenderDescription } from '@/shared/components/rich-text-editor/RenderDescription'
import { Badge } from '@/shared/components/ui/badge'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import { ArrowRight, Euro, Eye, MoreVertical, Pencil, School, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import { IAdminCourse, ICourse } from '../types/course'
import { buildUrl } from '@/shared/lib/utils'
// import ListStudents from './list-students'


interface IProps {
    data: IAdminCourse
}

const AdminCourseCard = ({ data }: IProps) => {
    console.log(buildUrl(data.thumbnail))
    return (
        <Card className='group relative py-0 gap-0'>
            <div className='absolute top-2 right-2 z-10'>
                <Badge variant={data.status === "published" ? "default" : "destructive"}>
                    {data.status === "published" ? "مفعل" : "غير مفعل"}
                </Badge>
            </div>
            <div className='h-80 relative'>
                <Image src={buildUrl(data.thumbnail)}
                    alt={data.title}
                    height={320}
                    width={400}
                    className='w-full rounded-t-lg  h-full object-fill'
                    unoptimized
                />
            </div>

            <CardContent className='flex flex-col gap-3 py-4'>
                <Link href={`/admin/courses/${data.id}`}
                    className='font-medium text-lg line-clamp-2 hover:underline 
                    group-hover:text-primary transition-colors text-center'>
                    {data.title}
                </Link>
                <div className='grid grid-cols-3 gap-0.5'>
                    <div className='space-y-2 text-center'>
                        <p className='font-semibold'>{data.students_count}</p>
                        <span className='text-[#64748B]'>طالب</span>
                    </div>
                    <div className='space-y-2 text-center'>
                        <p className='font-semibold'>{data.lessons_count}</p>
                        <span className='text-[#64748B]'>الدرس</span>
                    </div>
                    <div className='space-y-2 text-center'>
                        <p className='font-semibold'>{data.quizzes_count}</p>
                        <span className='text-[#64748B]'>اختبار</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p>{data.price}ج.م</p>
                    <Badge className='bg-[#F3E8FF] text-[#7E22CE]'>{data.is_free ? "مجاني" : "مدفوعه"}</Badge>
                </div>

                <div className='flex justify-center gap-4 items-center'>
                    <Link href={`/admin/courses/${data.id}/edit`}>
                        <Pencil className='size-5 me-2' />
                    </Link>
                    <Link href={`/admin/courses/${data.id}`}>
                        <Eye className='size-5 me-2' />
                    </Link>
                    <Link href={`/admin/courses/${data.id}/delete`}>
                        <Trash2 className='size-5 me-2 text-destructive' />
                    </Link>
                </div>


                    <Dialog>
                        <DialogTrigger >
                            <Button className='flex-1 w-full' variant="outline">أضافة طلاب لكورس</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>أضافة طلاب لكورس</DialogTitle>
                                <DialogDescription>
                                    كورس {data.title}
                                </DialogDescription>
                            </DialogHeader>
                            {/* <ListStudents title={data.title} courseId={data.id} /> */}
                        </DialogContent>
                    </Dialog>
            </CardContent>
        </Card >

    )
}

export default AdminCourseCard



