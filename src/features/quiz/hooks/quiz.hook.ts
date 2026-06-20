"use client"

import { useQuery } from "@tanstack/react-query"
import { getQuizDetailsApi } from "../apis/quiz.api"
import { IApiResponse } from "@/shared/lib/types/api"
import { Quiz } from "../types/quiz"

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