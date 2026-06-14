import { QuizInfoSchema } from "../schema/quiz.schema";


export type QuizInfoType = z.infer<typeof QuizInfoSchema>;
