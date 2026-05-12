import { IUser } from "./user";



export interface IAuthResponse {
    access_token: string;
    token_type: string
    role: "teacher" | "student"
}


export type LoginFormType = z.infer<typeof LoginFormSchema>;
