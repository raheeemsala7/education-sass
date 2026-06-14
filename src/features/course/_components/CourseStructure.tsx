'use client';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    rectIntersection,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
    ChevronDown,
    ChevronRight,
    FileText,
    GripVertical,
    Link2Icon,
    Loader2,
    Trash2,
    VideoIcon,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import ChapterModal from '@/features/chapter/_components/chapterModal';
import { Chapter } from '@/features/chapter/types/chapter';
import DeleteChapterModal from '@/features/chapter/_components/DeleteChapterModal';
import LessonModalComponent from '@/features/lesson/_components/EditLessonModal';
import DeleteLessonModal from '@/features/lesson/_components/DeleteLessonModal';
import { useLessonUploadStore } from '@/store/useLessonUploadStore';
import { useReorderChaptersMutation } from '@/features/chapter/hooks/chapter.hook';
import { useReorderLessonsMutation } from '@/features/lesson/hooks/lesson.hook';


interface SortableItemProps {
    id: number;
    data?: {
        type: 'chapter' | 'lesson';
        chapterId?: number;
    };
    children: (listeners: any) => ReactNode;
    className?: string;
}

/* ================= SORTABLE ITEM ================= */
function SortableItem({ id, data, children, className }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, data });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                'touch-none',
                isDragging ? 'z-10 opacity-80' : '',
                className
            )}
        >
            {children(listeners)}
        </div>
    );
}
/* ================= MAIN COMPONENT ================= */
interface IProps {
    id: string;
    data: Chapter[];
}
export default function CourseStructure({ id, data }: IProps) {
    const { mutateAsync: reorderChapters } = useReorderChaptersMutation(id)
    const { mutateAsync: reorderLessons } = useReorderLessonsMutation(id)

    const initalItems = data.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        order: chapter.order_index,
        isOpen: true,
        lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            order: lesson.order_index,
            type: lesson.type,
            content: lesson.content,
            video_url: lesson.video_url,
            live_url: lesson.live_url,
        }))
    })) || []
    const [items, setItems] = useState(initalItems)
    const uploads = useLessonUploadStore((s) => s.uploads);

    useEffect(() => {
        setItems((prev) => {
            const updateItems = data.map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
                description: chapter.description,
                order: chapter.order_index,
                isOpen: prev.find((item) => item.id === chapter.id)?.isOpen ?? true,
                lessons: chapter.lessons.map((lesson) => ({
                    id: lesson.id,
                    title: lesson.title,
                    order: lesson.order_index,
                    type: lesson.type,
                    content: lesson.content,
                    description: lesson.description,
                    video_url: lesson.video_url,
                    type: lesson.type
                }))
            })) || []
            return updateItems
        })
    }, [data])
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function toggleChapter(chapterId: number) {
        setItems((prev) =>
            prev.map((chapter) =>
                chapter.id === chapterId
                    ? { ...chapter, isOpen: !chapter.isOpen }
                    : chapter
            )
        );
    }
    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;

        /* ===== REORDER CHAPTERS ===== */
        if (activeType === 'chapter') {
            const oldIndex = items.findIndex((c) => c.id === active.id);
            const newIndex = items.findIndex((c) => c.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            const reordered = arrayMove(items, oldIndex, newIndex).map(
                (chapter, index) => ({
                    ...chapter,
                    order: index + 1,
                })
            );

            setItems(reordered);

            await reorderChapters(
                reordered.map((chapter) => ({
                    id: chapter.id,
                    order_index: chapter.order,
                }))
            );
            return;
        }

        /* ===== REORDER LESSONS ===== */
        if (activeType === 'lesson' && overType === 'lesson') {
            const chapterId = active.data.current?.chapterId;
            const overChapterId = over.data.current?.chapterId;

            if (!chapterId || chapterId !== overChapterId) return;

            const chapterIndex = items.findIndex(
                (chapter) => chapter.id === chapterId
            );
            if (chapterIndex === -1) return;

            const chapter = items[chapterIndex];

            const oldLessonIndex = chapter.lessons.findIndex(
                (l) => l.id === active.id
            );
            const newLessonIndex = chapter.lessons.findIndex(
                (l) => l.id === over.id
            );

            if (oldLessonIndex === -1 || newLessonIndex === -1) return;

            const reorderedLessons = arrayMove(
                chapter.lessons,
                oldLessonIndex,
                newLessonIndex
            ).map((lesson, index) => ({
                ...lesson,
                order: index + 1,
            }));

            const newItems = [...items];
            newItems[chapterIndex] = {
                ...chapter,
                lessons: reorderedLessons,
            };

            setItems(newItems);

            await reorderLessons(
                reorderedLessons.map((lesson) => ({
                    id: lesson.id,
                    order_index: lesson.order,
                }))
            );
        }
    }

    return (
        <DndContext
            collisionDetection={rectIntersection}
            sensors={sensors}
            onDragEnd={handleDragEnd}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b border-border">
                    <CardTitle>الاقسام</CardTitle>
                    <ChapterModal courseId={id} isEdit={false} />
                </CardHeader>

                <CardContent className="space-y-6 px-2 sm:px-6">
                    <SortableContext
                        items={items.map((i) => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((chapter) => (
                            <SortableItem
                                key={chapter.id}
                                id={chapter.id}
                                data={{ type: 'chapter' }}
                            >
                                {(listeners) => (
                                    <Card>
                                        <Collapsible
                                            open={chapter.isOpen}
                                            onOpenChange={() => toggleChapter(chapter.id)}
                                        >
                                            <div className="flex items-center justify-between p-3 border-b">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        {...listeners}
                                                        className="cursor-grab"
                                                    >
                                                        <GripVertical className="size-4" />
                                                    </Button>

                                                    <CollapsibleTrigger>
                                                        <Button size="icon" variant="ghost">
                                                            {chapter.isOpen ? (
                                                                <ChevronDown className="size-4" />
                                                            ) : (
                                                                <ChevronRight className="size-4" />
                                                            )}
                                                        </Button>
                                                    </CollapsibleTrigger>

                                                    <p className="font-medium">{chapter.title}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <DeleteChapterModal courseId={id} chapterId={chapter.id} />
                                                    <ChapterModal isEdit={true} courseId={id} chapterId={chapter.id} title={chapter.title} description={chapter.description} />

                                                </div>

                                            </div>

                                            <CollapsibleContent>
                                                <div className="p-1 sm:p-2 space-y-2">
                                                    <SortableContext
                                                        items={chapter.lessons.map((l) => l.id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        {chapter.lessons.map((lesson) => (
                                                            <SortableItem
                                                                key={lesson.id}
                                                                id={lesson.id}
                                                                data={{
                                                                    type: 'lesson',
                                                                    chapterId: chapter.id,
                                                                }}
                                                            >
                                                                {(lessonListeners) => (
                                                                    <div className="flex items-center gap-2 p-2 rounded group">
                                                                        <Button
                                                                            size="icon"
                                                                            className='size-7'
                                                                            variant="ghost"
                                                                            {...lessonListeners}
                                                                        >
                                                                            <GripVertical className="size-4" />
                                                                        </Button>
                                                                        <div className="w-full flex justify-between items-center">
                                                                            <div className="flex items-center gap-2 ">
                                                                                {uploads[lesson.id]?.status === "uploading" && (
                                                                                    <>
                                                                                        <Loader2 className="size-4 animate-spin transition-all text-primary" />
                                                                                        <span className="text-xs text-primary font-medium">
                                                                                            {uploads[lesson.id]?.progress ?? 0}%
                                                                                        </span>
                                                                                    </>
                                                                                )}
                                                                                {uploads[lesson.id]?.status === "processing" && (
                                                                                    <Loader2 className="size-4 animate-spin transition-all text-muted-foreground" />
                                                                                )}
                                                                                {lesson.type === "quiz" ?
                                                                                    <Link className="flex items-center gap-2  group-hover:underline group-hover:text-primary" href={`/admin/courses/create/exam/${lesson.content}`}>
                                                                                        <FileText className="size-4 text-primary" />
                                                                                        <span className='group-hover:text-primary underline group-hover:underline-primary'>{lesson.title}</span>
                                                                                    </Link>
                                                                                    :
                                                                                    <>
                                                                                        {
                                                                                            lesson.type === "quiz" ? (
                                                                                                <FileText className="size-4 text-primary" />
                                                                                            ) : lesson.type === "video" ? (
                                                                                                <VideoIcon className="size-4 text-primary" />
                                                                                            ) : (
                                                                                                <Link2Icon className="size-4 text-primary" />
                                                                                            )
                                                                                        }
                                                                                        <span >{lesson.title}</span>
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <LessonModalComponent
                                                                                    isEdit={true}
                                                                                    chapterId={chapter.id}
                                                                                    courseId={id}
                                                                                    lessonId={lesson.id}
                                                                                    title={lesson.title}
                                                                                    content={lesson.content}
                                                                                    description={lesson.description}
                                                                                    type={lesson.type}
                                                                                    key={lesson.id}
                                                                                    video_url={lesson.video_url}
                                                                                    live_url={lesson.live_url}
                                                                                />
                                                                                <DeleteLessonModal courseId={id} lessonId={lesson.id} disabled={uploads[lesson.id]?.status === "uploading"} />

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </SortableItem>
                                                        ))}
                                                    </SortableContext>
                                                    <div className="p-2">
                                                        <LessonModalComponent isEdit={false} chapterId={chapter.id} courseId={id} type={"video"} />
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </Card>
                                )}
                            </SortableItem>
                        ))}
                    </SortableContext>

                </CardContent>
            </Card>
        </DndContext >
    );
}
