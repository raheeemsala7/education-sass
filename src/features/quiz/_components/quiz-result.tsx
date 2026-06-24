import { MenuIcon } from 'lucide-react'
import React from 'react'
import { Question } from '../types/quiz';

interface IProps {
    questions: Question[];
    total_grade: number;
    duration:number;
};

const QuizResult = ({ questions, total_grade , duration }: IProps) => {
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
        </div>
    )
}

export default QuizResult