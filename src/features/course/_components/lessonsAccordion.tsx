import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { BookA, BookOpen, LinkIcon, QrCode, VideoIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ISection } from "../types/course";
import { buttonVariants } from "@/shared/components/ui/button";

interface LessonsAccordionProps {
    items: ISection[];
    coursesId: string
    isEnrolled : boolean
}


const LessonsAccordion = ({ items, coursesId , isEnrolled }: LessonsAccordionProps) => {


    const getLessonLink = (content_type: string, courseId: string, sectionId: number, lessonId: number) => {
        type ContentType = "لينك" | "فيديو" | "امتحان" | "pdf";
        const map: Record<ContentType, { route: string; label: string; link: string;  }> = {
            لينك: { route: "link", label: "فتح الرابط"  , link: "course_link"},
            فيديو: { route: "video", label: "مشاهدة الفيديو", link: "course_video"},
            امتحان: { route: "exam", label: "بدء الامتحان", link: "course_exam"},
            pdf: { route: "pdf", label: "تحميل الملف" , link: "course_pdf"},
        };
        const content = map[content_type as ContentType];
        const href = `/course/${courseId}/sections/${sectionId}/${content.link}/${lessonId}`;

        return href;
    };

    const getLessonLabel = (content_type: string) => {
        type ContentType = "لينك" | "فيديو" | "امتحان" | "pdf";
        const map: Record<ContentType, { label: string; link: string;  }> = {
            لينك: { label: "فتح الرابط"  , link: "course_link"},
            فيديو: { label: "مشاهدة الفيديو" , link: "course_video"},
            امتحان: { label: "بدء الامتحان" , link: "course_exam"},
            pdf: { label: "تحميل الملف" , link: "course_pdf"},
        };

        const { label } = map[content_type as ContentType];

        return label;
    };


    return (
        <Accordion  className="w-full bg-[#F3F4F6] dark:bg-[#080C14] p-4 space-y-6">
            {items.map((item, index) => (
                <div key={index} className=" bg-card rounded-lg border-none p-4" >
                    <AccordionItem
                        key={item.id}
                        value={String(item.id)}
                    // className={`rounded-lg border-none overflow-hidden bg-card ${item.isHighlighted ? "accordion-highlight" : "accordion-nested"}`}
                    >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline">
                            <div className="flex items-start gap-6 text-right w-full">
                                <QrCode className="w-8 h-8 text-primary shrink-0" />
                                <div className="space-y-4">
                                    <span className="block text-2xl font-bold text-foreground">
                                        {item.title}
                                    </span>
                                    <div className="leading-6 line-clamp-6">
                                        <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: `${1 * 50}ms` }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 bg-card">
                            {item.lessons && item.lessons.length > 0 && (
                                <Accordion  className="mt-4 space-y-2">
                                    {item.lessons.map((subItem) => (
                                        <AccordionItem
                                            key={subItem.id}
                                            value={String(subItem.id)}
                                            className="accordion-nested rounded-lg bg-[#F3F4F6] dark:bg-[#080C14]"
                                        >
                                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-right w-full">
                                                        <span className="text-primary">{
                                                            subItem.content_type === "لينك" ?
                                                                <LinkIcon className="w-6 h-6" />
                                                                : subItem.content_type === "فيديو" ?
                                                                    <VideoIcon className="w-6 h-6" />
                                                                    : subItem.content_type === "امتحان" ?
                                                                        <BookA className="w-6 h-6" />
                                                                        : subItem.content_type === "pdf" ?
                                                                            <BookOpen className="w-6 h-6" />
                                                                            : null
                                                        }</span>
                                                        <span className="font-semibold text-foreground">
                                                            {subItem.title}
                                                        </span>

                                                    </div>

                                                    {isEnrolled && (
                                                        <Link
                                                        scroll={true}
                                                        className={cn(buttonVariants({ variant: "outline" }), "!bg-amber-500 text-white !text-sm border-2 font-semibold px-2 py-1 !h-fit hover:!bg-transparent hover:!border-amber-500 hover:text-amber-500 transition-all ")}
                                                        href={getLessonLink(subItem.content_type, coursesId, items[index].id, subItem.id)}>
                                                        {getLessonLabel(subItem.content_type)}
                                                    </Link>
                                                    )
                                                }
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-4 pb-3">
                                                <p className="text-muted-foreground text-base font-semibold space-x-2">
                                                    <span className="text-rose-600 ">الوصف: </span> ضيفلنا property يا استاذ كريم نضيف فيها الوصف لدرس
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </div>
            ))}
        </Accordion>
    );
};

export default LessonsAccordion