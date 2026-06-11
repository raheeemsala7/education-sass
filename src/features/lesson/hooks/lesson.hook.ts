"use client"

import { toast } from "sonner"
import { createLessonAction, reorderLessonsAction } from "../apis/lesson.action"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateLessonVideoMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createLessonAction,
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}


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