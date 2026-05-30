"use client"
import{ useMemo } from 'react'
import EmptyState from './EmptyState'
import AdminCourseCard from './AdminCourseCard'
import { useGetAdminCoursesInfinite } from '../hooks/use-course'
import AdminCourseCardSkeletonLayout from './skeleton/list-admin-card'
import InfiniteScroll from "react-infinite-scroll-component"

const ListAdminCards = () => {


    const { data, fetchNextPage, hasNextPage, isLoading, isError } = useGetAdminCoursesInfinite()

    const allCourses = useMemo(
        () =>
            data?.pages.flatMap((page) =>
                page.data
            ) ?? [],
        [data]
    )
    
    if (isLoading) {
        return <AdminCourseCardSkeletonLayout />
    }
    if (isError) {
        return <EmptyState title='Admin Courses' description='Something went wrong' buttonText='Retry' href='/admin/courses' />
    }



    return (
        <InfiniteScroll
            dataLength={allCourses.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<AdminCourseCardSkeletonLayout />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>لا يوجد المزيد</b>
                </p>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 items-start"
            >
                {allCourses.map((course) => (
                    <AdminCourseCard key={course.id} data={course} />
                ))}
            </div>
        </InfiniteScroll>
    )
}



export default ListAdminCards