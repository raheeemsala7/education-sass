import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse } from "@/shared/lib/types/api"
import { Quiz } from "../types/quiz"
import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export const getQuizDetailsApi = async ({ req, quizId }: { req: NextRequest, quizId: string }) => {
    const token = await getToken({ req })
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/quiz/${quizId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
    })
    const data = await res.json()
    
    if (!data.status) {
        throw new Error(data.message || "Get quiz details failed")
    }
    return data as IApiResponse<Quiz>
   }
