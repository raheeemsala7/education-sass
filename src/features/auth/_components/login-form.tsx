"use client"
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form";
import { LoginFormType } from "../types/auth";
import { LoginFormSchema } from "../schema/login.schema";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import Link from "next/link";
import { Phone } from "lucide-react";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";




const LoginForm = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const getDeviceId = () => {
        let id = localStorage.getItem("device_id");

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("device_id", id);
        }

        return id;
    };
    function onSubmit(values: LoginFormType) {
        startTransition(async () => {
            try {
                const device_id = getDeviceId();

                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    device_id,
                    redirect: false,
                })

                if (!res || !res.ok) {
                    toast.error(res?.error || "Login failed")
                    return
                }

                console.log(res.error)

                toast.success("Login successful")
                window.location.href = "/"
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
            }
        })
    }



    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-8">
                <h4 className="text-2xl font-bold">تسجيل <span className="text-yellow-400">الدخول : </span></h4>
                <p className="text-muted-foreground">ادخل علي حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل</p>
            </div>
            <div className="mt-12 space-y-8">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            <div className="floating-input-wrapper">
                                <Input
                                    style={{
                                        boxShadow: "none"
                                    }}
                                    className="floating-input text-inherit border-none focus-within:outline-none focus-visible:outline-none"
                                    placeholder=" "
                                    {...field}
                                />
                                <label className="floating-label">
                                    <span className="size-4">
                                        <Phone className="w-4 h-4" />
                                    </span>
                                    <span>
                                        البريد الإلكتروني
                                    </span>
                                </label>
                                <span className="input-line"></span>
                            </div>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />


                {/* Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <div className="floating-input-wrapper">
                                <Input
                                    style={{
                                        boxShadow: "none"
                                    }}
                                    className="floating-input text-inherit border-none focus-within:outline-none focus-visible:outline-none"
                                    placeholder=""
                                    {...field}
                                />
                                <label className="floating-label">
                                    <span className="size-4">
                                        <Phone className="w-4 h-4" />
                                    </span>
                                    <span>
                                        كلمة المرور
                                    </span>
                                </label>
                                <span className="input-line"></span>
                            </div>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </div>



            {/* Submit Button */}
            <div className="animate-fade-in space-y-5" style={{ animationDelay: "0.95s" }}>
                <Button
                    disabled={isPending}
                    type="submit"
                    className="bg-primary hover:bg-transparent hover:text-primary hover:border-3 border-primary font-bold text-base px-6 py-3 h-auto cursor-pointe"
                >
                    {isPending ? "جاري المعالجة" : "طلب انشاء حساب !"}
                </Button>

                <p>يوجد لديك حساب بالفعل؟  <Link href={"/auth/login"} className="text-yellow-500 hover:underline transition"> ادخل إلى حسابك الآن !</Link></p>
            </div>
        </form>
    )
}

export default LoginForm