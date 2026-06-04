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
    sections?: ISection[];
    created_at: string;
    updated_at: string;
}

export interface IAdminCourse extends ICourse {
    is_active: boolean;
    enrollments_count: number;
}

export interface ICourseResponse {
    status: "success" | "error";
    data: ICourse;
}


export type CourseSchemaType = z.infer<typeof courseSchema>
