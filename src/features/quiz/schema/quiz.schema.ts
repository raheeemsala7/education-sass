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
    choices: z
        .array(z.string())
        .optional(),
    notes: z.string().optional(),
    imageUrl: z.string().optional(),
});

export type QuestionFormType = z.infer<typeof questionSchema>;

export const quizInfoSchema = z.object({
    title: z.string().min(1, "عنوان الامتحان مطلوب"),
    duration: z.number().min(1, "المدة مطلوبة"),
    description: z.string().max(500).optional(),

    settings: z.object({
        randomizeQuestions: z.boolean(),
        randomizeChoices: z.boolean(),
        showResultImmediately: z.boolean(),
        allowReview: z.boolean(),
        maxAttempts: z.string(),
        startDate: z.string().optional(),
    }),
    // questions: z.array(questionSchema),
});