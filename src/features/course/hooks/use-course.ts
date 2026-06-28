"use client"

import { IApiResponse, IPagination } from "@/shared/lib/types/api"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IAdminCourse, ICourse, ICoursesOverviewResponse } from "../types/course"
import { useSearchParams } from "next/navigation"
import { createCourseAction, deleteCourseAction   } from "../apis/courses.action"
import { DEFAULT_LIMIT_COURSES_ADMIN } from "@/shared/constant/api.constant"


export const useGetAdminCoursesQuery = () => {
    // Search params
    const searchParams = useSearchParams()

    // Variables
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) ||DEFAULT_LIMIT_COURSES_ADMIN
    const search = searchParams.get("search") || ""


    return useQuery({
        queryKey: ["adminCoursesList",page, limit, search],
        queryFn: async () => {
            const res = await fetch(`/api/courses?page=${page}&limit=${limit}&search=${search}`)

            const payload: IApiResponse<ICoursesOverviewResponse> = await res.json()
            if (!payload.status) {
                throw new Error(payload.message || "Error")
            }

            return payload
        },
    })
}



export const useGetSingleCourse = (courseId: string) => {
    return useQuery({
        queryKey: ["courseAdmin", courseId],
        queryFn: async () => {
            const res = await fetch(`/api/courses/${courseId}`)
            const payload: IApiResponse<ICourse> = await res.json()
            if (!payload.status) {
                throw new Error(payload.message || "Error")
            }
            return payload
        }
    })
}


export const useCreateCourseMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCourseAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ["adminCoursesList", 1]
            })
        }
    })
}



export const useDeleteCourseMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteCourseAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ["adminCoursesList", 1]
            })
        }
    })
}