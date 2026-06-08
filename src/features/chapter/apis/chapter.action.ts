"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { ChapterSchemaType } from "../types/chapter"
import { RESPONSES } from "@/shared/constant/api.responses"
import { HEADERS } from "@/shared/constant/api.constant"

export const createChapter = async ({ values, courseId }: { values: ChapterSchemaType, courseId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sections/course/${courseId}`, {
        method: "POST",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
        body: JSON.stringify(values)
    })

    const data = await res.json()
    return data
}
export const putChapter = async ({ values, chapterId }: { values: ChapterSchemaType, chapterId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sections/course/${chapterId}`, {
        method: "PUT",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
        body: JSON.stringify(values)
    })

    const data = await res.json()
    return data
}
export const deleteChapter = async ({ chapterId }: { chapterId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sections/course/${chapterId}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
    })

    const data = await res.json()
    return data
}