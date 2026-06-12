import { uploadVideoLessonSchema, videoLessonSchema } from "../schema/lesson.schema";

export type VideoLessonType = z.infer<typeof videoLessonSchema>;
export type UpdateVideoLessonType = z.infer<typeof uploadVideoLessonSchema>;

export interface LessonVideoRequest {
    title: string;
    description: string;
    video_url: string;
    live?: string;
    type: string
}
export interface UpdateLessonVideoRequest {
    type: string
    video_url: string;
    live?: string;
}