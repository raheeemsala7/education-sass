"use client"

import { IApiResponse, IPagination } from "@/shared/lib/types/api"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IAdminCourse, ICourse } from "../types/course"
import { useSearchParams } from "next/navigation"
import { createCourseAction, deleteCourseAction   } from "../apis/courses.action"

export type AdminCoursesResponse = 
    | {
        status: true
        data: IAdminCourse[]
        meta: IPagination
      }
    | {
        status: false
        message?: string
        code?: number
      }
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

            const payload: AdminCoursesResponse = await res.json()
            if (!payload.status) {
                throw new Error(payload.message || "Error")
            }

            return payload
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.current_page === lastPage.meta.last_page) {
                return undefined
            }
            return lastPage.meta.current_page + 1
        }
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