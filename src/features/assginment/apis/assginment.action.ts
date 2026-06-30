"use server"

import { getNextAuthToken } from "@/shared/lib/auth.util"
import { AssginmentInfoType } from "../types/assginment"

import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse } from "@/shared/lib/types/api"
import { QuestionFormType } from "@/features/quiz/schema/quiz.schema"


export async function updateQuizAction({ values, quizId }: { values: AssginmentInfoType, quizId: string }) {
    const token = await getNextAuthToken()
    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/quiz/edit/${quizId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(values)
    })
    const data: IApiResponse<AssginmentInfoType> = await res.json()
    if (!data.status) {
        throw new Error(data.message || "Update quiz failed")
    }
    return data
}


export async function postAddQuestionToAssginmentAction({ values, assginmentId }: { values: QuestionFormType, assginmentId: string }) {
    const token = await getNextAuthToken()
    console.log(token)
    if (!token?.access_token) return RESPONSES.unauthorized
    const payload = {
        ...values,
        options:values.options?.map((o) => ( o.text ))
    }
    const res = await fetch(`${process.env.API_URL}/homework/${assginmentId}/questions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...HEADERS.authorize(token.access_token),
        },
        body: JSON.stringify(payload)
    })
    console.log(payload)
    console.log(res)
    const data: IApiResponse<QuestionFormType> = await res.json()
    console.log(data)
    if (!data.status) {
        throw new Error(data.message || "Add question failed")
    }
    return data
}
// export async function updateQuestionAction({ values, questionId }: { values: QuestionFormType, questionId: string }) {
//     const token = await getNextAuthToken()
//     if (!token?.access_token) return RESPONSES.unauthorized
//     const payload = {
//         ...values,
//         options:values.options?.map((o) => ( o.text ))
//     }
//     const res = await fetch(`${process.env.API_URL}/quiz/questions/${questionId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             ...HEADERS.authorize(token.access_token),
//         },
//         body: JSON.stringify(payload)
//     })
//     const data: IApiResponse<QuestionFormType> = await res.json()
//     if (!data.status) {
//         throw new Error(data.message || "Add question failed")
//     }
//     return data
// }
// export async function deleteQuestionAction({ questionId }: {  questionId: string }) {
//     const token = await getNextAuthToken()
//     if (!token?.access_token) return RESPONSES.unauthorized

//     const res = await fetch(`${process.env.API_URL}/quiz/questions/${questionId}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             ...HEADERS.authorize(token.access_token),
//         },
//     })
//     const data: IApiResponse<QuestionFormType> = await res.json()
//     if (!data.status) {
//         throw new Error(data.message || "Add question failed")
//     }
//     return data
// }