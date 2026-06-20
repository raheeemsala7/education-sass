import { QuizCreateSchema, quizInfoSchema } from "../schema/quiz.schema";


export type QuizCreateType = z.infer<typeof QuizCreateSchema>;

export type QuizInfoType = z.infer<typeof quizInfoSchema>;


export type QuestionType = "true_false" | "choice";

export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    options: string[];
    grade: string;
    correct_answer: string;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    duration: number;
    deadline: string;
    total_grade: number;
    submitted: boolean;
    questions: Question[];
}

