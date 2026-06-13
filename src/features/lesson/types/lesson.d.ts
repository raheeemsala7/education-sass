import { uploadVideoLessonSchema, videoLessonSchema } from "../schema/lesson.schema";

export type VideoLessonType = z.infer<typeof videoLessonSchema>;
export type UpdateVideoLessonType = z.infer<typeof uploadVideoLessonSchema>;

export interface LessonVideoRequest {
    title: string;
    description: string;
    type: string
    video_url: string;
    live_url?: string;
    article_content?: string;
}
export interface UpdateLessonVideoRequest {
    type: string
    video_url: string;
    live_url?: string;
    article_content?: string;
}