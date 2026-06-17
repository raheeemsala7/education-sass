import { QuizInfoSchema } from "../schema/quiz.schema";


export type QuizInfoType = z.infer<typeof QuizInfoSchema>;


export type QuestionType = {
    id: number;
    question: string;
    type: "true_false" | string;
    options: string[];
    grade: string;
    correct_answer: string;
};

export type QuizDetailsType = {
    id: number;
    title: string;
    description: string;
    deadline: string; // ISO date string
    total_grade: number;
    submitted: boolean;
    questions: QuestionType[];
};

