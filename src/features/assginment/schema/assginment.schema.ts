import z from "zod";
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