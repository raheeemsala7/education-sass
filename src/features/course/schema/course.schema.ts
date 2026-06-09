import z from "zod";

export const isFreeEnum = [
    true,
    false
] as const;


export const CourseStatus = [
    true,
    false
] as const;

const SchoolGrade = [
    "الصف الأول الثانوي",
    "الصف الثاني الثانوي",
    "الصف الثالث الثانوي"
] as const;

export const courseSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long and must be unique"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters long"
    }),
    thumbnail: z.union([
        z.instanceof(File, { message: "مطلوب صورة الغلاف" }),
        z.string().min(1, { message: "مطلوب صورة الغلاف" }),
    ]),
    price: z.number().min(0, {
        message: "Price must be at least 0"
    }),
    is_free: z.boolean({
        message: "Level is required"
    }),
    category: z.enum(SchoolGrade, {
        message: "Category is required"
    }),
    is_active: z.boolean({
        message: "Status is required"
    }),
});

export const SchoolGrades = z.enum([
    "الصف الأول الثانوي",
    "الصف الثاني الثانوي",
    "الصف الثالث الثانوي"
]);



