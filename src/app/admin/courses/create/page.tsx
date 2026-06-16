import FormCreateCourse from '@/features/course/_components/form-create-course'
import { buttonVariants } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const CreateCoursePage = () => {
  return (
    <>
            <div className='flex items-center gap-3'>
                <Link href={"/admin/courses"} className={buttonVariants({ size: "icon" })}>
                    <ChevronRight className='font-bold text-2xl' />
                </Link>
                <h2 className='text-2xl'>انشاء الكورس</h2>
            </div >

            <Card>
                <CardHeader>
                    <CardTitle>معلومات أساسية</CardTitle>
                    <CardDescription>
                        تقديم المعلومات الأساسية حول الكورس
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormCreateCourse isEdit={false} />
                </CardContent>
            </Card>
        </>
  )
}
export default CreateCoursePage