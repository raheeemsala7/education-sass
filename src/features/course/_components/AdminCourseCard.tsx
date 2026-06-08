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
// import ListStudents from './list-students'


interface IProps {
    data: IAdminCourse
}

const AdminCourseCard = ({ data }: IProps) => {
    console.log(data.is_active)
    return (
        <Card className='group relative py-0 gap-0'>
            <div className='absolute top-2 left-2 z-10'>
                <DropdownMenu>
                    <DropdownMenuTrigger >
                        <Button variant={"secondary"} size={"icon"} className='bg-card'>
                            <MoreVertical className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='w-48 bg-card' >
                        <DropdownMenuItem >
                            <Link href={`/admin/courses/${data.id}/edit`}>
                                <Pencil className='size-4 me-2' />
                                تعديل الكورس
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Link href={`/admin/courses/${data.id}`}>
                                <Eye className='size-4 me-2' />
                                عرض الكورس
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <Link href={`/admin/courses/${data.id}/delete`}>
                                <Trash2 className='size-4 me-2 text-destructive' />
                                حذف الكورس
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='absolute top-2 right-2 z-10'>
                <Badge variant={data.is_active ? "default" : "destructive"}>
                    {data.is_active ? "مفعل" : "غير مفعل"}
                </Badge>
            </div>
            <div className='h-80 relative'>
                {/* <Image src={`${data.thumbnail}`}
                alt={data.title}
                height={320}
                width={400}
                className='w-full rounded-t-lg  h-full object-fill'
            /> */}
            </div>

            <CardContent className='flex flex-col gap-3 py-4'>
                <Link href={`/admin/courses/${data.id}`}
                    className='font-medium text-lg line-clamp-2 hover:underline 
                    group-hover:text-primary transition-colors'>
                    {data.title}
                </Link>
                <div className="line-clamp-2 text-sm text-muted-foreground leading-tight ">
                    {/* <RenderDescription  description={data.description} /> */}
                </div>
                <div className='mt-4 flex items-center gap-x-4'>
                    <div className='flex items-center gap-2'>
                        <Euro className='size-6 p-1 rounded-md text-primary bg-primary/10' />
                        <p className='text-sm text-nowrap'>{data.price} جنيهًا</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <School className='size-6 p-1 rounded-md text-primary bg-primary/10' />
                        <p className='flex items-center gap-1 text-sm'>
                            <span className='font-semibold'>{data.enrollments_count || 0}</span>
                            <span className='text-nowrap'> عدد الطلاب المشتركين</span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 mt-3">
                    <Link href={`/admin/courses/${data.id}/edit`} className={buttonVariants({ className: "w-full flex-1" })}>
                        تعديل الكورس <ArrowRight className='size-4' />
                    </Link>

                    <Dialog>
                        <DialogTrigger >
                            <Button className='flex-1 w-full' variant="outline">Open Dialog</Button>
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
                </div>
            </CardContent>
        </Card>

    )
}

export default AdminCourseCard



