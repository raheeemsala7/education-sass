"use client"

import { toast } from "sonner"
import { reorderLessonsAction } from "../apis/lesson.action"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useReorderLessonsMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: reorderLessonsAction,
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}