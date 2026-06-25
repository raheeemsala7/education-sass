import { BookOpen, Check, MenuIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Question } from '../types/quiz';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface IProps {
    questions: Question[];
    total_grade: number;
    duration: number;
};

const QuizResult = ({ questions, total_grade, duration }: IProps) => {
    const [showResults, setShowResults] = useState<Record<number, boolean>>({});
    console.log(duration)
    return (
        <div className='w-full'>
            <div className="flex items-center gap-3 w-full max-w-4xl mx-auto">
                <div className='bg-card shadow-xl rounded-2xl flex gap-3 flex-1 p-4'>
                    <div className='bg-[#FAF5FF] w-10.5 h-10.5 rounded-full flex justify-center items-center'>
                        <MenuIcon className='text-[#A855F7]' />
                    </div>
                    <div className='space-y-2'>
                        <p className='text-[#6B7280] text-sm '>عدد الأسئلة</p>
                        <div className='text-black text-base font-medium'>{questions.length} أسئلة</div>
                    </div>
                </div>
                <div className='bg-card shadow-xl rounded-2xl flex gap-3 flex-1 p-4'>
                    <div className='bg-[#FAF5FF] w-10.5 h-10.5 rounded-full flex justify-center items-center'>
                        <MenuIcon className='text-[#A855F7]' />
                    </div>
                    <div className='space-y-2'>
                        <p className='text-[#6B7280] text-sm '>الدرجة الكلية</p>
                        <div className='text-black text-base font-medium'>{total_grade} أسئلة</div>
                    </div>
                </div>
                <div className='bg-card shadow-xl rounded-2xl flex gap-3 flex-1 p-4'>
                    <div className='bg-[#FAF5FF] w-10.5 h-10.5 rounded-full flex justify-center items-center'>
                        <MenuIcon className='text-[#A855F7]' />
                    </div>
                    <div className='space-y-2'>
                        <p className='text-[#6B7280] text-sm '>الوقت</p>
                        <div className='text-black text-base font-medium'>{duration} دقيقة</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                {questions.map((que) => (
                    <Card key={que.id}>
                        <CardContent className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <Button variant={showResults[que.id] ? "outline" : "secondary"} onClick={() =>
                                    setShowResults((prev) => ({
                                        ...prev,
                                        [que.id]: !prev[que.id],
                                    }))
                                }>
                                    <BookOpen />
                                    {showResults[que.id] ? "اخفاء شرح السؤال" : "  شرح السؤال"}
                                </Button>
                                <div className='bg-emerald-500 px-3 py-1 text-white rounded-md'>
                                    {que.grade} درجه
                                </div>
                            </div>
                            {showResults[que.id] && (
                                <div>
                                    <p className='text-base font-medium'>شرح الأجابه : </p>



                                    {que.answer_image ? (
                                        <div className="flex justify-between bg-secondary mt-2">
                                            <div className='flex-1 p-2 text-2xl font-semibold'>
                                                التحليل 📝
                                            </div>

                                            <div className='flex-1 max-h-64'>
                                                <Image className='w-full h-full' src={que.answer_image} alt={que.question} height={600} width={390} />
                                            </div>

                                        </div>
                                    ) : (
                                        <p className='text-lg font-medium mt-3'>
                                            s'lf;lfd ,safk;;kD;FKFD ,FD;KDF
                                        </p>
                                    )}
                                </div>
                            )}

                            {que.question_image ? (
                                <div className='mt-4'>
                                    <div className="flex justify-between gap-4 mt-2">
                                        <div className='flex-1 '>
                                            <span className='inline-block w-fit px-4 py-1 rounded-md text-white bg-primary text-center text-sm font-semibold'>{que.order_index}/{questions.length}</span>

                                            <p className='text-lg font-semibold mt-3 mb-6'>{que.type === "choice" ? " اختر الإجابة الصحيحة" : "اختر علامة صح او خطأ"}</p>

                                            <ul className='space-y-3'>
                                            {que.type === "choice" ? (
                                                que.options.map((option) => (
                                                    <>
                                                        {option === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                        <li className={cn(
                                                            "text-lg font-bold ",
                                                            option === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                        )}>{option}</li>
                                                    </>
                                                ))
                                            ) : (
                                                <>
                                                <li>
                                                    {"true" === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                    <li className={cn(
                                                        "text-lg font-bold ",
                                                        "true" === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                    )}>صح</li>
                                                </li>
                                                <li>
                                                    {"false" === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                    <li className={cn(
                                                        "text-lg font-bold ",
                                                        "false" === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                    )}>خطأ</li>
                                                </li>
                                                    </>
                                            )}
                                        </ul>
                                        </div>

                                        <div className='flex-1 max-h-64'>
                                            <Image className='w-full h-full' src={que.question_image} alt={que.question} height={600} width={390} />
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className=''>
                                    <span className='inline-block w-fit px-4 py-1 rounded-md text-white bg-primary text-center text-sm font-semibold'>{que.order_index}/{questions.length}</span>
                                    <p className='text-center text-lg font-semibold'>{que.question}</p>
                                    <div>

                                        <p className='text-lg font-semibold mt-3 mb-6'>{que.type === "choice" ? " اختر الإجابة الصحيحة" : "اختر علامة صح او خطأ"}</p>

                                        <ul className='space-y-3'>
                                            {que.type === "choice" ? (
                                                que.options.map((option) => (
                                                    <>
                                                        {option === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                        <li className={cn(
                                                            "text-lg font-bold ",
                                                            option === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                        )}>{option}</li>
                                                    </>
                                                ))
                                            ) : (
                                                <>
                                                <li>
                                                    {"true" === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                    <li className={cn(
                                                        "text-lg font-bold ",
                                                        "true" === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                    )}>صح</li>
                                                </li>
                                                <li>
                                                    {"false" === que.correct_answer && <span className='text-white text-sm flex items-center gap-1.5 bg-emerald-800 px-2 py-1 w-fit rounded-md font-medium'> <Check className='size-4 font-medium' /> الاجابه الصحيحه</span>}
                                                    <li className={cn(
                                                        "text-lg font-bold ",
                                                        "false" === que.correct_answer ? "bg-emerald-500 text-white px-2 py-1" : ""
                                                    )}>خطأ</li>
                                                </li>
                                                    </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default QuizResult