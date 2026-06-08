import { IUser } from "./user";





type UserRole = "teacher" | "student";

interface TeacherProfile {
  id: number;
  user_id: number;
  bio: string | null;
  specialization: string;
  experience_years: number;
  cv: string | null;
  social_links: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

interface StudentProfile {
  id: number;
  user_id: number;
  father_phone: string | null;
  city: string | null;
  gender: "male" | "female" | null;
  grade: string | null;
  national_id: string | null;
  birth_date: string | null;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
}

type TeacherUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "teacher";
  profile: TeacherProfile;
};

type StudentUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "student";
  profile: StudentProfile;
};

export type IUser = TeacherUser | StudentUser;

export interface IAuthResponse {
    access_token: string;
    token_type: string
    user: IUser;
}


export type LoginFormType = z.infer<typeof LoginFormSchema>;
