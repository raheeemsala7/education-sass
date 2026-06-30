import { Question } from "@/features/quiz/types/quiz";
import { assginmentInfoSchema } from "../schema/assginment.schema";

export interface Assginment {
    id: number,
    title: string,
    description: string,
    deadline: string,
    total_grade: number,
    submitted: boolean,
    questions: Question[];
}

export type AssginmentInfoType = z.infer<typeof assginmentInfoSchema>;
