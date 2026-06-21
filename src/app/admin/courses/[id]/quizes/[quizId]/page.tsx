import QuestionsStepLayout from '@/features/quiz/_components/layout/questions-step-layout'
import { buttonVariants } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface IProps {
  params: Promise<{ quizId: string; id: string }>
}

const page = async ({ params }: IProps) => {
  const { quizId, id } = await params
  return (
    <div className='px-4'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h6 className='text-[#0F172A] text-xl font-semibold'>إنشاء امتحان جديد</h6>
          <p className='text-[#64748B] text-sm'>إنشاء امتحان جديد لدرس هذا</p>
        </div>

        <Link
          className={cn(buttonVariants({ variant: "outline" }), "rounded-md flex items-center gap-1")}
          href={`/admin/courses/${id}/edit`}>
          <ChevronRight />
          <span>العوده</span>
        </Link>
      </div>
      <QuestionsStepLayout quizId={quizId} />
    </div>
  )
}

export default page