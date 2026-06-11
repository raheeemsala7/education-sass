"use client"

import { toast } from "sonner"
import { createLessonAction, deleteLessonAction, reorderLessonsAction, updateLessonAction } from "../apis/lesson.action"
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
export const useUpdateLessonVideoMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateLessonAction,
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}


export const useDeleteLessonMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteLessonAction,
        onSuccess: (data) => {
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
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}