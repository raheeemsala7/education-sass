"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getQuizDetailsApi } from "../apis/quiz.api"
import { IApiResponse } from "@/shared/lib/types/api"
import { Quiz } from "../types/quiz"
import { postAddQuestionToQuiz, updateQuizAction } from "../apis/quiz.action"

export const useGetQuizDetailsQuery =  (quizId: string) => {
    return useQuery({
        queryKey: ["quiz", quizId],
        queryFn: async () => {
            const res = await fetch(`/api/quiz/${quizId}`)
            const data = await res.json()
            // console.log(data)
            if (!data.status) {
                throw new Error(data.message || "Get quiz details failed")
            }
            return data as IApiResponse<Quiz>
        } ,
    })
}

export const useUpdateQuizMutation = (quizId : string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateQuizAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ["quiz", quizId]
            })
        }
    })
}

export const useAddQuestionToQuizMutation = (quizId : string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postAddQuestionToQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ["quiz", quizId]
            })
        }
    })
}