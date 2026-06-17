import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { IApiResponse } from "@/shared/lib/types/api"



export const getQuizDetailsApi = async (quizId: number) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/quizes/${quizId}`, {
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
