"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteChapter, putChapter } from "../apis/chapter.action"
import { createChapter } from "../apis/chapter.action"



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

