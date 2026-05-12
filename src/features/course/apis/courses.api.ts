import { IApiResponse } from "@/shared/lib/types/api"
import { ICourse } from "../types/course"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { RESPONSES } from "@/shared/constant/api.responses"
import { HEADERS } from "@/shared/constant/api.constant"


export const getCoursesListApi = async () => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized


    const res = await fetch(`${process.env.API_URL}/courses`, {
        headers: {
            ...HEADERS.authorize(token.access_token)
        }
    })

    const payload: IApiResponse<ICourse[]> = await res.json()

    if (payload.status === "error") {
        throw new Error(payload.message || "Failed to fetch courses list")
    }

    return payload
}



export const getCourseDetailApi = async (id: string) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/courses/${id}`, {
        headers: {
            ...HEADERS.authorize(token.access_token)
        }
    })

    const payload: IApiResponse<ICourse> = await res.json()

    if (payload.status === "error") {
        throw new Error(payload.message || "Failed to fetch course detail")
    }

    return payload
}
