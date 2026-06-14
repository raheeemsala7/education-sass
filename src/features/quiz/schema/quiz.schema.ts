import { typeLesson } from "@/shared/constant/lessonType.constant";
import z from "zod";



export const QuizInfoSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).or(z.literal("")),
    type: z.enum(typeLesson, {
        message: "Type is required"
    }),
})