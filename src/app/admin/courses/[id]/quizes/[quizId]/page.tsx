import QuestionsStepLayout from '@/features/quiz/_components/questions-step-layout'
import { buttonVariants } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

interface IProps {
  params : Promise<{id : string}>
}

const page = async({params} : IProps) => {
  const {id} = await params
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
          <div>
            <h6>إنشاء امتحان جديد</h6>
            <p>أنشئ امتحان شامل بإضافة الأسئلة وتحديد الإعدادات</p>
          </div>

          <Link 
          className={cn(buttonVariants())}
          href={`/admin/courses/${id}`}>العوده</Link>
      </div>
      <QuestionsStepLayout />
    </div>
  )
}

export default page