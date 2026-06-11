

import { authOptions } from '@/auth'
import LessonsAccordion from '@/features/course/_components/lessonsAccordion'
import { getSingleCourseDetailApi } from '@/features/course/apis/courses.api'
import { RenderDescription } from '@/shared/components/rich-text-editor/RenderDescription'
import { Card } from '@/shared/components/ui/card'
import { getServerSession } from 'next-auth'
import React from 'react'

const layout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) => {
    const { id } = await params

    const session = await getServerSession(authOptions)

    const course = await getSingleCourseDetailApi(id)
    if (!course || !course.status || !course.data) {
        return <p>غير موجود</p>
    }
    return (
        <section className='bg-[#F3F4F6] dark:bg-inherit'>
            <div className="w-full max-w-8xl mx-auto px-4">

                {/* ####################### */}

                <div className='rounded-md py-24 px-4 sm:px-8 sm:mx-8 text-slate-100 relative overflow-hidden pb-56 bg-blue-600'>
                    <div className="relative z-10 space-y-6">
                        <div className="flex flex-wrap"></div>
                        <div className="text-3xl font-w-bold">{course.data.title}</div>
                        <div className="flex flex-col gap-2">
                            <RenderDescription description={course.data.description} />
                        </div>
                        <div className="flex flex-col sm:flex-row font-smaller text-slate-100 sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse">
                            <div className="flex gap-2 items-center">
                                <span className="flex-center-both trasnform text-blue-400 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z" opacity=".3"></path><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg>
                                </span>
                                <span className="font-w-bold underline text-sm sm:text-base"><span>
                                    تاريخ انشاء الكورس</span>
                                </span>
                                <span className="bg-blue-400 px-3 rounded-full opacity-90 text-sm sm:text-base text-slate-800">{course.data.created_at}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className="flex-center-both trasnform text-rose-400 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--icon-park-twotone" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><defs><mask id="iconifyReact1"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20"></path><path d="M33.542 27c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7v6m19.084-18v6c-1.274-4.057-5.064-7-9.542-7s-8.268 2.943-9.542 7"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#iconifyReact1)"></path></svg>
                                </span>
                                <span className="font-w-bold underline text-sm sm:text-base">آخر تحديث للكورس</span>
                                <span className="bg-rose-400 px-3 rounded-full opacity-90 text-slate-800 text-sm sm:text-base">{course.data.updated_at}</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 w-full h-full">
                        <div
                            className="w-auto h-full md:w-full opacity-20 relative mr-auto transform bg-cover bg-top bg-no-repeat"
                            style={{
                                backgroundImage: "url('/bg-cover.png')"
                            }}
                        ></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient text-blue-500"></div>
                    </div>
                </div>



                {children}


                <Card className='py-12 px-5 rounded-xl bg-[#F3F4F6] dark:bg-card shadow-2xl border-none'>
                    <div className='w-fit bg-[#E9F7FC] dark:bg-[#172835] p-4  rounded-xl border border-primary'>
                        <h4 className=' text-2xl sm:text-3xl font-bold group transition-all'>
                            <span className='group-hover:text-rose-600' > محتوي </span>
                            <span className='text-rose-600 group-hover:text-inherit'>الكورس </span>
                        </h4>
                    </div>

                    <LessonsAccordion items={course.data.sections || []} coursesId={id} isEnrolled={session?.user && course.data.is_free
                        ? true
                        : course.data.is_enrolled} />
                </Card>
            </div>
        </section>
    )
}

export default layout       