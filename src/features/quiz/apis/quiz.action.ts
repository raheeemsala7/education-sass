"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { QuizInfoType } from "../types/quiz"
import { IApiResponse } from "@/shared/lib/types/api"

export async function updateQuizAction({ values, quizId }: { values: QuizInfoType, quizId: string }) {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/quiz/edit/${quizId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })
    const data: IApiResponse<QuizInfoType> = await res.json()
    if (!data.status) {
        throw new Error(data.message || "Update quiz failed")
    }
    return data
}