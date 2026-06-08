import z from "zod";

export const chapterSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
    description: z.string().optional()
});
