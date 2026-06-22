import { QuizCreateSchema, quizInfoSchema } from "../schema/quiz.schema";


export type QuizCreateType = z.infer<typeof QuizCreateSchema>;

export type QuizInfoType = z.infer<typeof quizInfoSchema>;


export type QuestionType = "true_false" | "choice";

export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    options: string[];
    grade: number;
    correct_answer: string;
    explanation: string;
    question_image: string;
    answer_image: string;
    notes: string;
    order_index:number
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    duration: number;
    deadline: string;
    total_grade: number;
    submitted: boolean;
    max_attempts: number;
    allow_resume: boolean;
    random_questions: boolean;
    random_options: boolean;
    show_result_immediately: boolean;
    questions: Question[];
}

