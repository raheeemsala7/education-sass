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
import { Loader2, Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useDeleteChapterMutation } from "../hooks/chapter.hook"

const DeleteChapterModal = ({ courseId, chapterId }: { courseId: string; chapterId: number }) => {

    const [open, setOpen] = useState(false)
    const [pending, startTransition] = useTransition()
    const { mutate: deleteChapter } = useDeleteChapterMutation(courseId)


    async function onSubmit() {
        startTransition(async () => {
            try {
                await deleteChapter({
                    chapterId: chapterId.toString(),
                })
                setOpen(false)
                toast.success("Chapter deleted successfully")
            } catch (error) {
                toast.error("Failed to delete chapter")
            }
        })
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <Button size={"icon"} variant="destructive" className="size-7 sm:size-9">
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader className="!text-right">
                    <AlertDialogTitle>هل تريد حذف القسم؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        هذا سيؤدي إلى حذف القسم بشكل نهائي. هل أنت متأكد؟
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

export default DeleteChapterModal