export interface StudentProfile {
    id: number;
    user_id: number;
    father_phone: string | null;
    city: string | null;
    gender: "male" | "female";
    grade: string | null;
    national_id: string | null;
    birth_date: string | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
}

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: number;
    student_profile: StudentProfile | null;
}

export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

export interface StudentsResponse {
    data: Student[];
    meta: PaginationMeta;
}