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

    console.log(data)
    return data
}
export const putChapter = async ({ values, chapterId }: { values: ChapterSchemaType, chapterId: string }) => {
    const token = await getNextAuthToken()

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/sections/${chapterId}`, {
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
    console.log("1. deleteChapter called", chapterId)

    const token = await getNextAuthToken()
    console.log("2. token", token)

    if (!token?.access_token) return RESPONSES.unauthorized
    console.log("3. about to fetch")

    console.log(process.env.API_URL)

    const res = await fetch(`${process.env.API_URL}/sections/${chapterId}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.access_token),
            ...HEADERS.JsonBody,
        },
    })


    const data = await res.json()
    console.log(data)
    return data
}