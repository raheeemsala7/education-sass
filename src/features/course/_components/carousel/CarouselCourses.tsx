import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/components/ui/carousel'
import { CourseCard } from '../CourseCard'
import CarouselAutoplay from './CarouselAutoplay'

import { Card, CardContent } from '@/shared/components/ui/card'
import { getCoursesListApi } from '../../apis/courses.api'



const CarouselCourses = async () => {

    const courses = await getCoursesListApi()


    if (!courses || !courses.status || !courses.data) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <p className="text-center text-destructive">حدث خطأ في تحميل البيانات</p>
                    </CardContent>
                </Card>
            </div>
        )
    }


    console.log(courses.data)
    if ( courses.data.length === 0) {
        return <p>لا يوجد كورسات حاليا</p>
    }



    return (
        <>

            <CarouselAutoplay>

                <CarouselContent >
                    {courses.data.map((course) => (
                        <CarouselItem className='basis-1/1 md:basis-1/2  lg:basis-1/3 ps-1 lg:ps-4' key={course.id}
                        >
                            <CourseCard
                                id={course.id}
                                category={"الصف الثاني الثانوي"}
                                created_at={course.created_at}
                                updated_at={course.updated_at}
                                description={course.description}
                                thumbnail={course.thumbnail}
                                is_free={course.is_free}
                                price={course.price}
                                title={course.title}
                                key={course.id}
                                is_enrolled={course.is_enrolled}

                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="flex items-center justify-center gap-6 rtl:[direction:rtl] mt-12">
                    <div className="flex gap-6">
                        <CarouselPrevious className="static w-12 h-12 rounded-full border border-[#302D2B] rtl:rotate-180" />
                        <CarouselNext className="static w-12 h-12 rounded-full border border-[#302D2B] rtl:rotate-180" />
                    </div>

                </div>
            </CarouselAutoplay>


            <div className='flex md:hidden flex-col items-center gap-8 mt-16'>
                {courses.data.map((course) => (
                    <CourseCard
                        id={course.id}
                        category={"الصف الثاني الثانوي"}
                        is_enrolled={course.is_enrolled}
                        description={course.description}
                        thumbnail={course.thumbnail}
                        is_free={course.is_free}
                        price={course.price}
                        title={course.title}
                        key={course.id}
                        created_at={course.created_at}
                        updated_at={course.updated_at}

                    />
                ))}
            </div>
        </>
    )
}

export default CarouselCourses
