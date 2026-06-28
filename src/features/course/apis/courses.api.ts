import { ICoursesOverviewResponse } from './../types/course.d';
import { IApiResponse } from "@/shared/lib/types/api"
import { ICourse } from "../types/course"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { RESPONSES } from "@/shared/constant/api.responses"
import { DEFAULT_LIMIT_COURSES_ADMIN, HEADERS } from "@/shared/constant/api.constant"
import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"


export const getCoursesListApi = async () => {
    const token = await getNextAuthToken()
    let res = await fetch(`${process.env.API_URL}/courses`, {
        headers: token?.access_token
            ? {
                ...HEADERS.authorize(token.access_token)
            }
            : {}
    })


    // لو التوكين expired
    // if (res.status === 401) {
    //     res = await fetch(`${process.env.API_URL}/courses`)
    // }
    const payload: IApiResponse<ICourse[]> = await res.json()

    if (!payload.status) {
        throw new Error(payload.message || "Failed to fetch courses list")
    }

    return payload
}

export const getAdminCoursesListApi = async (req: NextRequest) => {

    const token = await getToken({ req })
    if (!token?.access_token) return RESPONSES.unauthorized

    const page = req.nextUrl.searchParams.get("page") || 1
    const limit = req.nextUrl.searchParams.get("limit") || DEFAULT_LIMIT_COURSES_ADMIN
    let search
    if (search) {
        search = req.nextUrl.searchParams.get("search")
    }

    const res = await fetch(`${process.env.API_URL}/admin/courses-overview?page=${page}&limit=${limit}&search${search}`, {
        headers: {
            ...HEADERS.authorize(token.access_token)
        }
    })
    const payload: IApiResponse<ICoursesOverviewResponse> = await res.json()

    if (!payload.status) {
        throw new Error(payload.message || "Failed to fetch admin courses list")
    }
    return payload

}

export const getSingleCourseDetailApi = async (id: string) => {
    const token = await getNextAuthToken()

    // if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/courses/${id}`, {
        headers: {
            ...HEADERS.authorize(token?.access_token || "")
        }
    })


    const payload: IApiResponse<ICourse> = await res.json()

    if (!payload.status) {
        throw new Error(payload.message || "Failed to fetch course detail")
    }

    return payload
}

export const getSingleAdminCourseDetailApi = async ({ req, id }: { req: NextRequest, id: string }) => {
    const token = await getToken({ req })

    if (!token?.access_token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/courses/${id}`, {
        headers: {
            ...HEADERS.authorize(token.access_token)
        }
    })


    const payload: IApiResponse<ICourse> = await res.json()

    if (!payload.status) {
        throw new Error(payload.message || "Failed to fetch course detail")
    }

    return payload
}