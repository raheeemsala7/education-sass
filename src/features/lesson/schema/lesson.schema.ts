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
    video_url: z
        .string()
        .min(1, { message: "مطلوب رفع الفيديو" }),
})
export const linkLessonSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).or(z.literal("")),
    type: z.enum(typeLesson, {
        message: "Type is required"
    }),
    live_url: z.string().url({ message: "Live URL is invalid" }),
})