import { typeLesson } from "@/shared/constant/lessonType.constant";
import z from "zod";

export const videoLessonSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    type: z.enum(typeLesson, {
        message: "Type is required"
    }),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).optional(),
})
export const uploadVideoLessonSchema = z.object({
    content: z
        .string()
        .min(1, { message: "مطلوب رفع الفيديو" }),
})