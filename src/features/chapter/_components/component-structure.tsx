"use client"
import CourseStructure from '@/features/course/_components/CourseStructure'
import FormCreateCourse from '@/features/course/_components/form-create-course'
import { useGetSingleCourse } from '@/features/course/hooks/use-course'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useLessonUploadStore } from '@/store/useLessonUploadStore'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ComponentStructure = ({ courseId }: { courseId: string }) => {

  const router = useRouter();

  const isUploading = useLessonUploadStore(
    (state) => Object.keys(state.uploads).length > 0
  );

  /* منع refresh / close */
  useEffect(() => {
    if (!isUploading) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isUploading]);

  /* منع back button */
  useEffect(() => {
    if (!isUploading) return;

    const blockPopState = () => {
      alert('⏳ يتم رفع الفيديو، لا يمكنك مغادرة الصفحة الآن');
      router.push(window.location.pathname);
    };

    window.addEventListener('popstate', blockPopState);
    return () => window.removeEventListener('popstate', blockPopState);
  }, [isUploading, router]);

  const { data: payload, isLoading, isError } = useGetSingleCourse(courseId)





  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  }

  if (!payload || isError) {
    return (
      <p>لا يوجد بيانات لعرضها</p>
    )
  }

  const { title, category, description, is_free, price, thumbnail, sections = [], } = payload?.data

  return (
    <Tabs defaultValue='basic-info' className='w-full'>
      <TabsList className='grid grid-cols-2 w-full'>
        <TabsTrigger value='basic-info'>معلومات أساسية</TabsTrigger>
        <TabsTrigger value='course-strucutre'>بنية الكورس</TabsTrigger>
      </TabsList>
      <TabsContent value='basic-info' dir='rtl' >
        <FormCreateCourse id={courseId} isEdit={true} title={title} category={"الصف الثالث"} description={description} is_active={true} is_free={is_free} price={price} thumbnail={thumbnail} />
      </TabsContent>
      <TabsContent value='course-strucutre' dir='rtl'>
        <Card >
          <CardHeader>
            <CardTitle>بنية الكورس</CardTitle>
            <CardDescription>تحديث بنية الكورس</CardDescription>
          </CardHeader>
          <CardContent className='px-0 sm:px-6'>
            <CourseStructure id={courseId} data={sections || []} />
            <p>ddd</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default ComponentStructure
