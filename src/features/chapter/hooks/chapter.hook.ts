"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createChapter, deleteChapter, putChapter } from "../apis/chapter.action"



export const useCreateChapterMutation = (courseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createChapter,
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
        mutationFn: deleteChapter,
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
        mutationFn: putChapter,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courseAdmin", courseId]
            })
            }
    })
}

