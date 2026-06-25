"use client"

import { toast } from "sonner"
import { createLessonAction, createLinkLessonAction, createQuizLessonAction, deleteLessonAction, reorderLessonsAction, updateLessonAction } from "../apis/lesson.action"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateLessonVideoMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createLessonAction,
        onSuccess: (data) => {
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

export const useCreateLinkLessonMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createLinkLessonAction,
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}
export const useCreateQuizLessonMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createQuizLessonAction,
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}
export const useCreateAssginmentLessonMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createQuizLessonAction,
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