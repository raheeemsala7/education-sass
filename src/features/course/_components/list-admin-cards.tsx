"use client"
import { useMemo } from 'react'
import EmptyState from './EmptyState'
import AdminCourseCard from './AdminCourseCard'
import { useGetAdminCoursesQuery } from '../hooks/use-course'
import AdminCourseCardSkeletonLayout from './skeleton/list-admin-card'
import InfiniteScroll from "react-infinite-scroll-component"
import Pagination from '@/shared/components/pagination'

const ListAdminCards = () => {


    const { data, isLoading, isError } = useGetAdminCoursesQuery()

    const courses = data?.data.courses ?? [];
    const pagination = data?.data.pagination;

    if (isLoading) {
        return <AdminCourseCardSkeletonLayout />
    }
    if (isError) {
        return <EmptyState title='Admin Courses' description='Something went wrong' buttonText='Retry' href='/admin/courses' />
    }



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.map((course) => (
                <AdminCourseCard key={course.id} data={course} />
            ))}
            </div>

            {pagination && (
                <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.total_pages}
                />
            )}
        </>
    )
}



export default ListAdminCards