import z from "zod";
export const assginmentInfoSchema = z.object({
    title: z.string().min(1, "عنوان الامتحان مطلوب"),
    duration: z.number().min(1, "المدة مطلوبة"),
    description: z.string().max(500).optional(),


    deadline: z.string().optional(),
});