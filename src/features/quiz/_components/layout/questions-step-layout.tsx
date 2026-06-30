"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import QuizInfoForm from "../quiz-info-form"
import { useGetQuizDetailsQuery } from "../../hooks/quiz.hook"
import { Loader2 } from "lucide-react"
import QuestionForm from "../question-form"
import QuizResult from "../quiz-result"

const QuestionsStepLayout = ({quizId, courseId} : {quizId : string, courseId : string}) => {

  const { data: payload, isLoading } = useGetQuizDetailsQuery(quizId)

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  }

if (!payload || !payload.status) {
    return (
      <p>لا يوجد بيانات لعرضها</p>
    )
  }
  const {title , description ,duration, total_grade , questions , allow_resume , max_attempts , random_questions , random_options , show_result_immediately} = payload.data

  console.log(payload.data)
  return (
    <Tabs defaultValue="info" className="flex justify-center items-center">
      <TabsList className={"w-full max-w-3xl rounded-sm p-0"}>
        <TabsTrigger className={`p-4 rounded-sm data-active:bg-[#EFFFF8] data-active:text-[#126870] border-[#E2E8F0] flex items-center gap-2 group`} value="info">
          <span className="group-data-active:bg-[#126870] bg-[#E2E8F0] text-[#64748B] group-data-active:text-white font-semibold size-6 rounded-full text-xs flex justify-center items-center">1</span>
          <span> معلومات الامتحان</span>
        </TabsTrigger>
        <TabsTrigger className={`p-4 rounded-sm data-active:bg-[#EFFFF8] data-active:text-[#126870] border-[#E2E8F0] flex items-center gap-2 group`} value="questions">
          <span className="group-data-active:bg-[#126870] bg-[#E2E8F0] text-[#64748B] group-data-active:text-white font-semibold size-6 rounded-full text-xs flex justify-center items-center">2</span>
          <span>الأسئلة</span>
        </TabsTrigger>
        <TabsTrigger className={`p-4 rounded-sm data-active:bg-[#EFFFF8] data-active:text-[#126870] border-[#E2E8F0] flex items-center gap-2 group`} value="view">
          <span className="group-data-active:bg-[#126870] bg-[#E2E8F0] text-[#64748B] group-data-active:text-white font-semibold size-6 rounded-full text-xs flex justify-center items-center">3 </span>
          <span>مراجعة ونشر</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info" className={"w-full mt-4"}>
        <QuizInfoForm  courseId={courseId} quizId={quizId} title={title} description={description} duration={duration} total_grade={total_grade} countQuestions={questions.length} max_attempts={max_attempts} allow_resume={allow_resume} random_questions={random_questions} random_options={random_options} show_result_immediately={show_result_immediately}  />
      </TabsContent>
      <TabsContent value="questions" className={"w-full mt-4"}>
        <QuestionForm quizId={quizId} questions={questions} />
      </TabsContent>
      <TabsContent value="view" className={"w-full mt-4"}>
        <QuizResult questions={questions} total_grade={total_grade} duration={duration}/>
      </TabsContent>
    </Tabs>
  )
}

export default QuestionsStepLayout