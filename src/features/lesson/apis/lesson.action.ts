"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { LessonVideoRequest, LinkLessonType, UpdateLessonVideoRequest } from "../types/lesson"
import { Lesson } from "@/features/chapter/types/chapter"
import { IApiResponse } from "@/shared/lib/types/api"


export const createLessonAction = async ({ chapterId, values }: { chapterId: number, values: LessonVideoRequest }) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/lessons/section/${chapterId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })

    const data : IApiResponse<Lesson> = await res.json()

    if (!data.status) {
        throw new Error(data.message || "Create lesson failed")
    }
    return data as  IApiResponse<Lesson>
}
export const updateLessonAction = async ({ lessonId, values }: { lessonId: number, values: UpdateLessonVideoRequest }) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/lessons/${lessonId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })

    const data : IApiResponse<Lesson> = await res.json()

    if (!data.status) {
        throw new Error(data.message || "Update lesson failed")
    }
    return data as  IApiResponse<Lesson>
}

export const createLinkLessonAction = async ({ chapterId, values }: { chapterId: number, values: LinkLessonType }) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/lessons/section/${chapterId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })
    const data : IApiResponse<Lesson> = await res.json()

    if (!data.status) {
        throw new Error(data.message || "Create lesson failed")
    }
    return data as  IApiResponse<Lesson>
}

export const deleteLessonAction = async (lessonId: number) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/lessons/${lessonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
    })

    const data = await res.json()
    return data
}


export const reorderLessonsAction = async (lessons: { id: number, order_index: number }[]) => {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/lessons/reorder`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify({ lessons })
    })

    const data = await res.json()
    return data
}