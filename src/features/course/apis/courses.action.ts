"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { CourseSchemaType, ICourse } from "../types/course"
import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse } from "@/shared/lib/types/api"


export const createCourseAction = async (values: CourseSchemaType) => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/courses`, {
        method: "POST",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody
        },
        body: JSON.stringify(values)
    })

    const data : IApiResponse<ICourse> = await res.json()
    return data
}