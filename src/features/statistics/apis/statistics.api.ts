import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { IApiResponse } from "@/shared/lib/types/api"
import { IDashboard } from "../types/statistics"

export const getStatisticsApi = async () => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized 

    const res = await fetch(`${process.env.API_URL}/admin/dashboard`, {
        headers: {
            ...HEADERS.authorize(token.access_token)
        },
        next : {
            tags : ["statistics"]
        }
    })

    const payload : IApiResponse<IDashboard> = await res.json()

    if (!payload.status) {
        return payload
    }

    return payload

}