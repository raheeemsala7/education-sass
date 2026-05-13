"use client"
import React, { useMemo } from 'react'
import { getAdminCoursesListApi } from '../apis/courses.api'
import EmptyState from '../EmptyState'
import AdminCourseCard from './AdminCourseCard'
import { useGetAdminCoursesInfinite } from '../hooks/use-course'
import AdminCourseCardSkeletonLayout from './skeleton/list-admin-card'
import InfiniteScroll from "react-infinite-scroll-component"

const ListAdminCards =   () => {

    
    const { data ,fetchNextPage , hasNextPage , isLoading , isError} =  useGetAdminCoursesInfinite()

   
    const allCourses = useMemo(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data])



  

    return (
        <InfiniteScroll
            dataLength={allCourses.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<AdminCourseCardSkeletonLayout />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                {allCourses.map((course) => (
                    <AdminCourseCard key={course.id} data={course}  />
                ))}
            </div>
        </InfiniteScroll>
    )
}



export default ListAdminCards