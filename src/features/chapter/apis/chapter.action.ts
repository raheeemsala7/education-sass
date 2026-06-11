"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { ChapterSchemaType } from "../types/chapter"
import { RESPONSES } from "@/shared/constant/api.responses"
import { HEADERS } from "@/shared/constant/api.constant"

export const createChapterAction = async ({ title, description, courseId }: ChapterSchemaType & { courseId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/sections/course/${courseId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify({ title, description })
    })


    const data = await res.json()

    return data
}
export const putChapterAction = async ({ title, description, chapterId }: ChapterSchemaType & { chapterId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/sections/${chapterId}`, {
        method: "PUT",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
        body: JSON.stringify({ title, description })
    })

    const data = await res.json()
    return data
}
export const deleteChapterAction = async ({ chapterId }: { chapterId: string }) => {

    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized


    const res = await fetch(`${process.env.API_URL}/sections/${chapterId}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
    })
    const data = await res.json()
    return data
}



export const reorderChaptersAction = async (sections: { id: number, order_index: number }[]) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/sections/reorder`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify({ sections })
    })

    const data = await res.json()
    return data
}