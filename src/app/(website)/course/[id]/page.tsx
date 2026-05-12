


import { getSingleCourseDetailApi } from '@/features/course/apis/courses.api'
import { RenderDescription } from '@/shared/components/rich-text-editor/RenderDescription'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { Euro } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const page = async ({ params }: { params: { id: string } }) => {
        const { id } = await params


    
        const course = await getSingleCourseDetailApi(id)
        if (!course || course.status !== "success" || !course.data) {
            return <p>غير موجود</p>
        }

        console.log(course)
    return (
        <div className="px-2 lg:px-4 sm:px-10 relative py-0 space-y-10 md:mx-6 ">
            <div className="flex flex-col md:flex-row-reverse gap-10 mb-8">
                <div className=" md:basis-1/3 relative -mt-44">
                    <div className="backdrop-blur-sm backdrop-saturate-180 bg-[#0001] border-l border-t border-[rgba(255,255,255,0.25)] rounded-2xl">
                        <div className="p-4 space-y-8">
                            <div className="overflow-hidden rounded-md">
                                <Image src={course.data.thumbnail} height={288} width={550} alt='Cover' />
                            </div>
                            
                            {!course.data.is_enrolled ? <>
                            <div className="w-fit mx-auto flex bg-[#eab308] rounded-2xl mt-8">
                                <div className='bg-blue-600 rounded-2xl px-4 text-lg font-semibold flex gap-2 items-center'>
                                    <span>{course.data.price}</span>
                                    <Euro />
                                </div>
                                <div className='b rounded-xl px-2'>جنيهًا</div>
                            </div>
                            <Link href="/register" className={cn(buttonVariants(), "w-full bg-blue-600 text-white rounded-full px-3 py-1 ")}>
                                اشترك الآن
                            </Link>
                            </> : <Button className='w-full rounded-full px-3 py-1 font-semibold hover:bg-transparent hover:border-2 border-primary hover:text-primary transition-all'>
                                انت مشترك بهذا الكورس !
                                </Button>}
                        </div>
                    </div>
                </div>

                <div className="md:basis-2/3">
                    <div className='space-y-5 md:mt-6'>
                        <div className="rounded-2xl shadow-2xl overflow-hidden !bg-transparent">
                            {/* <Image src={course.data.thumbnail} alt={course.data.title} height={300} width={950} /> */}
                        </div>

                        <Card className='px-8 py-12 border-none'>
                            <div className='w-fit bg-[#E9F7FC] dark:bg-[#172835] p-4  rounded-xl border border-primary'>
                                <h4 className=' text-2xl sm:text-3xl font-bold hover:!text-rose-600'>{course.data.title}</h4>
                            </div>
                            <div className="text-secondary-foreground text-base sm:text-lg leading-9">
                                <RenderDescription description={course.data.description} />
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page




















