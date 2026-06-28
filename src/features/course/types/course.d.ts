import { Chapter } from "@/features/chapter/types/chapter";

export interface ILesson {
    id: number;
    title: string;
    description: string | null;
    video_url: string | null;
    duration: number | null;
    content: string;
    content_type: "فيديو" | "لينك" | "امتحان";
    order_index: number;
    views: number;
}

export interface ISection {
    id: number;
    title: string;
    description: string;
    order_index: number;
    lessons: ILesson[];
}

export interface ICourse {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    is_free: boolean;
    thumbnail: string;
    is_enrolled: boolean;
    sections?: Chapter[];
    created_at: string;
    updated_at: string;
}

export interface IAdminCourse {
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    is_free: boolean,
    students_count: number,
    lessons_count: number,
    quizzes_count: number,
    status: "published" | "draft"
}

export interface ICoursesOverviewResponse {
    courses: IAdminCourse[]
    pagination: {
        current_page: number
        page_size: number
        total_items: number
        total_pages: number
    }
    metadata: {
        totalStudents: number
        totalEnrolledStudents: number
    }
}


export type CourseSchemaType = z.infer<typeof courseSchema>
