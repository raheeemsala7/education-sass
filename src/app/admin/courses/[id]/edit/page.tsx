import ComponentStructure from '@/features/chapter/_components/component-structure'
import FormCreateCourse from '@/features/course/_components/form-create-course'
import { useGetSingleCourse } from '@/features/course/hooks/use-course'
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

  const { id: courseId } = await  params


  // const payload = await getSingleCourseDetailApi(courseId)


  return (
    <ComponentStructure courseId={courseId} />
  )
}

export default page