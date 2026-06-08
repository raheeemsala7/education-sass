import { chapterSchema } from "../schema/chapter.schema";

export type ChapterSchemaType = z.infer<typeof chapterSchema>;


export interface Chapter {
    id: number;
    title: string;
    description: string;
    order_index: number;
    isOpen: boolean;
    lessons: Lesson[];
}
export interface Lesson {
    id: number;
    title: string,
    description: string,
    duration: string,
    content: string,
    content_type: string,
    quiz_id: string,
    order_index: number,
    is_active: string
}