"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { CourseSchemaType, ICourse } from "../types/course"
import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse } from "@/shared/lib/types/api"


export const createCourseAction = async (values: CourseSchemaType) => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

console.log("TOKEN VALUE:", token?.access_token)


    console.log("values")
    console.log(values)

    const res = await fetch(`${process.env.API_URL}/courses`, {
        method:"POST",
        headers : {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })
    console.log(res)

    const payload: IApiResponse<ICourse> = await res.json()
    return payload
}