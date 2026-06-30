import { DEFAULT_LIMIT_USERS, HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IApiResponse, IPaginatedResponse } from "@/shared/lib/types/api"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"
import { Student, StudentsResponse } from "../types/users"



export const getAllUsersApi = async (req: NextRequest) => {
    const token = await getToken({ req })
    if (!token?.access_token) return RESPONSES.unauthorized

    const page = req.nextUrl.searchParams.get("page") ?? "1";

    const limit =
        req.nextUrl.searchParams.get("limit") ??
        DEFAULT_LIMIT_USERS.toString();

    const search = req.nextUrl.searchParams.get("search") ?? "";

    const res = await fetch(
        `${process.env.API_URL}/admin/students?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
        )}`,
        {
            headers: {
                ...HEADERS.authorize(token.access_token),
            },
        }
    );
    console.log(res)
    const payload: IApiResponse<Student[]> = await res.json()

    if (!payload.status) {
        throw new Error(payload.message || "Failed to fetch admin courses list")
    }
    return payload

}