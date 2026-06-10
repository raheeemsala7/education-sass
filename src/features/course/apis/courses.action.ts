"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { CourseSchemaType, ICourse } from "../types/course"
import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse } from "@/shared/lib/types/api"


export const createCourseAction = async (values: CourseSchemaType) => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const formData = new FormData()

    formData.append("title", values.title)
    formData.append("description", values.description)
    formData.append("price", values.price)
    formData.append("is_free", values.is_free)
    formData.append("is_active", values.is_active)
    formData.append("category", values.category)
    if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail)
    } else {
        formData.append("thumbnail", values.thumbnail)
    }

    const res = await fetch(`${process.env.API_URL}/courses`, {
        method:"POST",
        headers : {
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: formData
    })

    const payload: IApiResponse<ICourse> = await res.json()
    return payload
}

export const deleteCourseAction = async (id: string) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/courses/${id}`, {
        method:"DELETE",
        headers : {
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
    })

    const payload: IApiResponse<ICourse> = await res.json()
    return payload
}
