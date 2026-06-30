"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IApiResponse } from "@/shared/lib/types/api"
import { Assginment } from "../types/assginment"
import { deleteQuestionAction, postAddQuestionToAssginmentAction, updateQuestionAction } from "../apis/assginment.action"

export const useGetAssginmentDetailsQuery = (assginmentId: string) => {
    return useQuery({
        queryKey: ["assginment", assginmentId],
        queryFn: async () => {
            const res = await fetch(`/api/assginment/${assginmentId}`)
            const data = await res.json()
            if (!data.status) {
                throw new Error(data.message || "Get quiz details failed")
            }
            return data as IApiResponse<Assginment>
        },
    })
}

// export const useUpdateAssginmentMutation = ({ quizId, courseId }: { quizId: string, courseId: string }) => {
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: updateQuizAction,
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["quiz", quizId]
//             });
//             queryClient.invalidateQueries({
//                 queryKey: ["courseAdmin", courseId]
//             });
//         }
//     })
// }

export const useAddQuestionToAssginmentMutation = (assginmentId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postAddQuestionToAssginmentAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assginment", assginmentId]
            })

        }
    })
}
export const useUpdateQuestionMutation = (assginmentId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateQuestionAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assginment", assginmentId]
            })
        }
    })
}
export const useDeleteQuestionMutation = (quizId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteQuestionAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["quiz", quizId]
            })
        }
    })
}