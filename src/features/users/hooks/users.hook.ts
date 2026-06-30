"use client"
import { useQuery } from "@tanstack/react-query"
import { StudentsResponse } from "../types/users"
import { IApiResponse } from "@/shared/lib/types/api"

export const useGetAllStudentsQuery = (search: string,
    page: number) => {
    return useQuery({
        queryKey: ["studentsAll"],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                search,
            })
            const res = await fetch(`/api/users?${params}`);
            const payload: IApiResponse<StudentsResponse> = await res.json()

            return payload
        }
    })
}