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
    question: z.string().min(1, "نص السؤال مطلوب"),
    grade: z.number().min(1),
    correct_answer: z.string().min(1, "الإجابة الصحيحة مطلوبة"),
    options: z
        .array(z.object({
            text: z.string()
        }))
        .optional(),
    notes: z.string().optional(),
    question_image: z.union([
        z.instanceof(File, { message: "مطلوب صورة سؤال" }),
        z.string().url(),
        z.literal("")
    ]).optional(),
    answer_image: z.union([
        z.instanceof(File, { message: "مطلوب صورة الإجابة" }),
        z.string().url(),
        z.literal("")
    ]).optional(),
    explanation: z.string().optional(),
});

export type QuestionFormType = z.infer<typeof questionSchema>;

export const quizInfoSchema = z.object({
    title: z.string().min(1, "عنوان الامتحان مطلوب"),
    duration: z.number().min(1, "المدة مطلوبة"),
    description: z.string().max(500).optional(),

    random_questions: z.boolean(),
    random_options: z.boolean(),
    show_result_immediately: z.boolean(),
    allow_resume: z.boolean(),
    max_attempts: z.string(),
    deadline: z.string().optional(),
});