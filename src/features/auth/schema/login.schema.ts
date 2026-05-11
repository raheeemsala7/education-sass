import z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
    password: z.string().min(6, { message: "كلمة السر يجب أن تكون 6 أحرف على الأقل" }),
});

