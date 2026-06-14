"use client"
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { PenIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { VideoLesson } from './videoLesson'
import LinkLesson from './linkLesson'
// import CreateLessonExam from './form/createExamLesson'
// import EditLessonLink from './formEdit/editLessonLink'
// import { EditVideoLesson } from './formEdit/editVideo'


const LessonModalComponent = ({ isEdit, chapterId, courseId, lessonId, title, content, description, type , video_url ,live_url}: { isEdit: boolean, chapterId: number, courseId: string, lessonId?: number, title?: string, content?: string, description?: string, type?: string, video_url?: string, article_url?: string, live_url?: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [contentType, setContentType] = useState<'video' | 'live' | 'pdf' | "quiz">("video")

    console.log(contentType)


    function handleOpenChange(open: boolean) {
        // if (!open) {
        //     form.reset()
        // }
        setIsOpen(open)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                {isEdit ?
                    <Button size={"icon"} variant="secondary" className="size-7 sm:size-9">
                        <PenIcon className="size-4" />
                    </Button>
                    : (
                        <Button variant="outline" size={"sm"} className='gap-2 w-full'>
                            <Plus className='size-4' /> انشاء درس جديد
                        </Button>
                    )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                {
                    isEdit ? (
                        <>
                            {contentType === "video" ?
                                <VideoLesson isEdit={true} content={content || ""} courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={handleOpenChange} title={title || ""} description={description || ""} type={type || "video"} video_url={video_url || ""}/>
                                // : type === "امتحان" ?
                                //     <CreateLessonExam courseId={courseId} chapterId={chapterId} setIsOpen={setIsOpen} />
                                //     : type === "لينك" ?
                                //         <EditLessonLink courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={setIsOpen} title={title} content={content} description={description} />
                                : null
                            }
                        </>
                    ) : (
                        <>
                            <DialogHeader  >
                                <DialogTitle>انشاء درس جديد</DialogTitle>
                                <DialogDescription>ما الذي تريد أن تسميه الدرس؟</DialogDescription>
                            </DialogHeader>


                            <div className='space-y-4'>
                                <Label htmlFor="lesson-type">نوع الدرس</Label>
                                <Select onValueChange={(value) => setContentType(value as 'video' | 'live' | 'pdf' | "quiz")} defaultValue={contentType}>
                                    <SelectTrigger id="lesson-type" className='w-full'>
                                        <SelectValue placeholder="Select a lesson type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>نوع الدرس</SelectLabel>
                                            <SelectItem value="امتحان">امتحان</SelectItem>
                                            <SelectItem value="video">فيديو</SelectItem>
                                            <SelectItem value="live">لينك</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {contentType === "video" ?
                                <VideoLesson isEdit={false} courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={handleOpenChange} type={type || "video"} video_url={video_url || ""} title={title ||""} description={description || ""} content={content || ""} />
                                : contentType === "live" ?
                                    <LinkLesson isEdit={false} type={type || "live"} courseId={courseId} chapterId={chapterId} lessonId={lessonId || 1} setIsOpen={setIsOpen} title={title || ""} live_url={live_url || ""} description={description || ""} />
                                // : type === "امتحان" ?
                                //     <CreateLessonExam courseId={courseId} chapterId={chapterId} setIsOpen={setIsOpen} />
                                : null
                            }
                        </>
                    )
                }



                {/* {type === "فيديو" ?
                    <EditVideoLesson courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={handleOpenChange} title={title} description={description} content={content} />
                    : type === "امتحان" ?
                        <CreateLessonExam courseId={courseId} chapterId={chapterId} setIsOpen={setIsOpen} />
                        : type === "لينك" ?
                            <EditLessonLink courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={setIsOpen} title={title} content={content} description={description} />
                            : null
                } */}




            </DialogContent>

        </Dialog>
    )
}

export default LessonModalComponent