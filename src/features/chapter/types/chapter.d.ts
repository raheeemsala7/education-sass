import { chapterSchema } from "../schema/chapter.schema";

export type ChapterSchemaType = z.infer<typeof chapterSchema>;
