"use client"

import { IApiResponse, IPaginatedResponse, IPagination } from "@/shared/lib/types/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { IAdminCourse } from "../types/course"
import { useSearchParams } from "next/navigation"


export const useGetAdminCoursesInfinite = () => {
    // Search params
    const searchParams = useSearchParams()

    // Variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 2

    return useInfiniteQuery({
        queryKey: ["adminCoursesList", page],
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/courses?page=${pageParam}&limit=${limit}`)

            const payload: IApiResponse<IPaginatedResponse<IAdminCourse[]>> = await res.json()
            if (payload.status === "error") {
                throw new Error(payload.message || "Error")
            }

            console.log(payload)
            return payload
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const meta = lastPage.data?.meta
            if (!meta || meta.current_page === meta.last_page) return undefined
            return meta.current_page + 1
        }
    })
}