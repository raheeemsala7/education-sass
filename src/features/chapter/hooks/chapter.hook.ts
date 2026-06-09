"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createChapterAction, deleteChapterAction, putChapterAction, reorderChaptersAction } from "../apis/chapter.action"



export const useCreateChapterMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createChapterAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courseAdmin" ,courseId]
            })
        }
    })
}
export const useDeleteChapterMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteChapterAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courseAdmin" ,courseId]
            })
            },
            onError: (error) => {
                toast.error("Chapter not deleted"),
                console.log(error)
            }
    })
}
export const useUpdateChapterMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: putChapterAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courseAdmin", courseId]
            })
            }
    })
}


export const useReorderChaptersMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: reorderChaptersAction,
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["courseAdmin", courseId] })
        }
    })
}