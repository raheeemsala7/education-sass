import z from "zod";
import { typeLesson } from "../constant/lessonType.constant";


export const EgyptianCities = z.enum([
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "البحر الأحمر",
    "البحيرة",
    "الفيوم",
    "الغربية",
    "الإسماعيلية",
    "المنوفية",
    "المنيا",
    "القليوبية",
    "الوادي الجديد",
    "السويس",
    "أسوان",
    "أسيوط",
    "بورسعيد",
    "دمياط",
    "الشرقية",
    "جنوب سيناء",
    "كفر الشيخ",
    "مطروح",
    "الأقصر",
    "قنا",
    "سوهاج"
]);

export const SchoolGrades = z.enum([
    "الصف الأول الثانوي",
    "الصف الثاني الثانوي",
    "الصف الثالث الثانوي"
]);


export const registerFormSchema = z.object({
    firstName: z.string().min(2, { message: "الاسم الأول مطلوب" }),
    lastName: z.string().min(2, { message: "الاسم الأخير مطلوب" }),
    phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
    fatherPhone: z.string().min(10, { message: "رقم هاتف الأب غير صالح" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
    gender: z.enum(["female", "male"]),
    city: z.string().min(1, { message: "المحافظة مطلوبة" }),
    grade: z.string().min(1, { message: "الصف الدراسي مطلوب" }),

    nationalId: z.any().refine((val) => val instanceof File, {
        message: "صورة البطاقة مطلوبة"
    }),
    password: z.string().min(6, { message: "كلمة السر يجب أن تكون 6 أحرف على الأقل" }),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "كلمة السر غير متطابقة",
    path: ["password_confirmation"],
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const LoginFormSchema = z.object({
    // phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),

    password: z.string().min(6, { message: "كلمة السر يجب أن تكون 6 أحرف على الأقل" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;




export const isFreeEnum = [
    true,
    false
] as const;

// export const CourseStatus = [
//     'نشر',
//     'مسودة',
//     'مؤرشفة'
// ] as const;
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
    thumbnail: z
        .string()
        .min(1, { message: "مطلوب صورة الغلاف" }),
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



export const chapterSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
    description: z.string().optional()
});




export const CreatelessonVideoSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    content_type: z.enum(typeLesson, {
        message: "Type is required"
    }),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).optional(),
})
export const UpdatelessonVideoSchema = z.object({

    content: z
        .string()
        .min(1, { message: "مطلوب رفع الفيديو" }),
})
export const UpdatelessonLinkSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    content: z
        .string().url({ message: "مطلوب رفع الرابط" }),
    content_type: z.enum(typeLesson, {
        message: "Type is required"
    }),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).optional(),

})

export const CreatelessonExamSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }).max(100),
    content_type: z.enum(typeLesson, {
        message: "Type is required"
    }),
    description: z.string().min(3, { message: "Description be at least 3 chapters long" }).optional(),
    duration: z.number().min(1, { message: "Duration must be at least 1 minute" }),
    grade: z.number().min(1, { message: "Total marks must be at least 1" }),
})




export const courseEditSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long and must be unique"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters long"
    }),
    thumbnail: z.union([
        z.string().url(),
        z.instanceof(File).nullable().optional(),
    ]),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    is_free: z.boolean({
        message: "Level is required"
    }),


});


export const examSchema = z.object({
    title: z.string().min(1, "عنوان الامتحان مطلوب"),
    description: z.string().optional(),
    durationMinutes: z
        .number()
        .min(1, "المدة يجب أن تكون أكبر من صفر"),
});



export const questionSchema = z.object({
    questionText: z
        .string()
        .min(1, "نص السؤال مطلوب")
        .min(5, "نص السؤال قصير جدًا"),
    marks: z
        .number()
        .min(1, "الدرجة لا تقل عن 1")
        .max(100, "الدرجة كبيرة جدًا"),
    questionImage: z
        .string()
        .optional()
        .nullable(),
    notes: z
        .string()
        .optional()
});

export type CourseSchemaType = z.infer<typeof courseSchema>
export type CourseEditSchemaType = z.infer<typeof courseEditSchema>
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type CreatelessonVideoType = z.infer<typeof CreatelessonVideoSchema>;
export type CreatelessonExamType = z.infer<typeof CreatelessonExamSchema>;
export type UpdatelessonVideoType = z.infer<typeof UpdatelessonVideoSchema>;
export type UpdatelessonLinkSchemaType = z.infer<typeof UpdatelessonLinkSchema>;
export type ExamFormValues = z.infer<typeof examSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;
