import FormCreateCourse from '@/features/course/_components/form-create-course'
import { getSingleCourseDetailApi } from '@/features/course/apis/courses.api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface PageProps {
  params:  Promise<{
    id: string;
  }>
}

const page = async ({ params }: PageProps) => {

  const { id: courseId } = await params

  console.log("courseId")
  console.log(courseId)
  console.log("courseId")

  const payload = await getSingleCourseDetailApi(courseId)

  

  if (payload.status !== "success") {
    return <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  }

  if (!payload.data) {
    return (
  <p>لا يوجد بيانات لعرضها</p>
)
  }

  const { title, category, description, is_free, price, thumbnail, sections = [] ,  } = payload.data


  return (
    <div>
      <Tabs defaultValue='basic-info' className='w-full'>
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger value='basic-info'>معلومات أساسية</TabsTrigger>
          <TabsTrigger value='course-strucutre'>بنية الكورس</TabsTrigger>
        </TabsList>
        <TabsContent value='basic-info' dir='rtl' >
          <Card>
            <CardHeader>
              <CardTitle>معلومات أساسية</CardTitle>
              <CardDescription>تحديث المعلومات الأساسية للكورس</CardDescription>
            </CardHeader>
            <CardContent>
              <FormCreateCourse isEdit={true} id={courseId} title={title} category={"الصف الثالث"} description={description} is_active={true} is_free={is_free} price={price} thumbnail={thumbnail} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='course-strucutre' dir='rtl'>
          <Card >
            <CardHeader>
              <CardTitle>بنية الكورس</CardTitle>
              <CardDescription>تحديث بنية الكورس</CardDescription>
            </CardHeader>
            <CardContent className='px-0 sm:px-6'>
              {/* <CourseStructure id={id} data={sections || []} /> */}
              <p>ddd</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page