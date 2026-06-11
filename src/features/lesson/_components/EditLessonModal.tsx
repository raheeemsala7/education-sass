"use client"
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { PenIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { VideoLesson } from './videoLesson'
// import CreateLessonExam from './form/createExamLesson'
// import EditLessonLink from './formEdit/editLessonLink'
// import { EditVideoLesson } from './formEdit/editVideo'


const LessonModalComponent = ({ isEdit, chapterId, courseId, lessonId, title, content, description, type }: { isEdit: boolean, chapterId: number, courseId: string, lessonId?: number, title?: string, content?: string, description?: string, type?: string }) => {


    const [isOpen, setIsOpen] = useState(false)
    const [contentType, setContentType] = useState<'فيديو' | 'امتحان' | 'لينك'>("فيديو")


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
                        <p>ff</p>
                    ) : (
                        <>
                            <DialogHeader  >
                                <DialogTitle>انشاء درس جديد</DialogTitle>
                                <DialogDescription>ما الذي تريد أن تسميه الدرس؟</DialogDescription>
                            </DialogHeader>


                            <div className='space-y-4'>
                                <Label htmlFor="lesson-type">نوع الدرس</Label>
                                <Select onValueChange={(value) => setContentType(value as 'فيديو' | 'امتحان' | 'لينك')} defaultValue={contentType}>
                                    <SelectTrigger id="lesson-type" className='w-full'>
                                        <SelectValue placeholder="Select a lesson type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>نوع الدرس</SelectLabel>
                                            <SelectItem value="امتحان">امتحان</SelectItem>
                                            <SelectItem value="فيديو">فيديو</SelectItem>
                                            <SelectItem value="لينك">لينك</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {contentType === "فيديو" ?
                                <VideoLesson courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={handleOpenChange} title={title} description={description} content={content} />
                                // : type === "امتحان" ?
                                //     <CreateLessonExam courseId={courseId} chapterId={chapterId} setIsOpen={setIsOpen} />
                                //     : type === "لينك" ?
                                //         <EditLessonLink courseId={courseId} chapterId={chapterId} lessonId={lessonId} setIsOpen={setIsOpen} title={title} content={content} description={description} />
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