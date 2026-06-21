import { typeLesson } from "@/shared/constant/lessonType.constant";
import z from "zod";



export const QuizCreateSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).or(z.literal("")),
    type: z.enum(typeLesson, {
        message: "Type is required"
    }),
})


export const questionSchema = z.object({
    type: z.enum(["choice", "true_false"]),
    text: z.string().min(1, "نص السؤال مطلوب"),
    grade: z.number().min(1),
    correctAnswer: z.string().min(1, "الإجابة الصحيحة مطلوبة"),
    options: z
        .array(z.object({
            text: z.string()
        }))
        .optional(),
    notes: z.string(),
    imageUrl: z.string().optional(),
});

export type QuestionFormType = z.infer<typeof questionSchema>;

export const quizInfoSchema = z.object({
    title: z.string().min(1, "عنوان الامتحان مطلوب"),
    duration: z.number().min(1, "المدة مطلوبة"),
    description: z.string().max(500).optional(),

    // settings: z.object({
    random_questions: z.boolean(),
    random_choices: z.boolean(),
    show_result_immediately: z.boolean(),
    allow_resume: z.boolean(),
    max_attempts: z.string(),
    deadline: z.string().optional(),
    // }),
    // questions: z.array(questionSchema),
});