import { IUser } from "./user";



export interface IAuthResponse {
    access_token: string;
    token_type: string
    role: string
}


export type LoginFormType = z.infer<typeof LoginFormSchema>;
