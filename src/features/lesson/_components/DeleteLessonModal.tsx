

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import { Button } from "@/shared/components/ui/button"
// import { useDeleteLessonMutation } from "@/hooks/use-course"
import { Loader2, Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

const DeleteLessonModal = ({ courseId, lessonId, disabled }: { courseId: string; lessonId: number; disabled: boolean }) => {

        console.log("disabled", disabled)


    const [open, setOpen] = useState(false)
    const [pending, startTransition] = useTransition()
    // const { mutate: deleteLesson } = useDeleteLessonMutation(courseId, lessonId)


    async function onSubmit() {
        startTransition(async () => {
            try {
                // await deleteLesson()
                setOpen(false)
                toast.success("Lesson deleted successfully")
            } catch (error) {
                toast.error("Failed to delete lesson")
            }
        })
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <Button disabled={disabled} size={"icon"} variant="destructive" className="size-7 sm:size-9">
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader className="!text-right">
                    <AlertDialogTitle>هل تريد حذف الدرس؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        هذا سيؤدي إلى حذف الدرس بشكل نهائي. هل أنت متأكد؟
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>الغاء</AlertDialogCancel>
                    <Button onClick={onSubmit} variant={"destructive"} disabled={pending} className="flex items-center gap-2">
                        {pending ?
                            <>
                                <Loader2 />
                                جاري الحذف...
                            </>
                            : "حذف"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteLessonModal