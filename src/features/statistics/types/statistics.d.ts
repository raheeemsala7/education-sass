export interface IDashboardStudent {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    created_at: string;
}

export interface IDashboardEnrollment {
    student_id: number;
    student_name: string;
    course_id: number;
    course_title: string;
    paid_amount: string;
    enrolled_at: string;
}

export interface IRegistrationChart {
    month: string;
    total: number;
}

export interface IDashboard {
    students: {
        total: number;
        free: number;
        paid: number;
    };
    courses: {
        total: number;
        free: number;
        paid: number;
    };
    quizzes: {
        total: number;
    };
    last_students: IDashboardStudent[];
    last_enrollments: IDashboardEnrollment[];
    charts: {
        registrations_last_12_months: IRegistrationChart[];
    };
}

