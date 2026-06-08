"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { RESPONSES } from "@/shared/constant/api.responses"
import { HEADERS } from "@/shared/constant/api.constant"
import { CreateLessonVideoType } from "../types/lesson"

export const createChapter = async ({ values, chapterId }: { values: CreateLessonVideoType, chapterId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/sections/${chapterId}`, {
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
export const putChapter = async ({ values, lessonId }: { values: CreateLessonVideoType, lessonId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/${lessonId}`, {
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
export const deleteChapter = async ({ lessonId }: { lessonId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/${lessonId}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
    })

    const data = await res.json()
    return data
}