// "use client"
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { PenIcon, Plus } from 'lucide-react'
import { useState } from 'react'
// import CreateLessonExam from './form/createExamLesson'
// import EditLessonLink from './formEdit/editLessonLink'
// import { EditVideoLesson } from './formEdit/editVideo'


const EditLessonModal = ({ chapterId, courseId, lessonId, title, content, description, type }: { chapterId: number, courseId: string, lessonId: number, title: string, content: string, description: string, type: string }) => {


    const [isOpen, setIsOpen] = useState(false)

    function handleOpenChange(open: boolean) {
        // if (!open) {
        //     form.reset()
        // }
        setIsOpen(open)
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <Button size={"icon"} variant="secondary" className="size-7 sm:size-9">
                    <PenIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader  >
                    <DialogTitle>تعديل درس</DialogTitle>
                    <DialogDescription>ما الذي تريد أن تسميه الدرس؟</DialogDescription>
                </DialogHeader>




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

export default EditLessonModal