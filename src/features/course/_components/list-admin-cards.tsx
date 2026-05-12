import React from 'react'
import { getAdminCoursesListApi } from '../apis/courses.api'
import EmptyState from '../EmptyState'
import AdminCourseCard from './AdminCourseCard'

const ListAdminCards = async () => {

    const courses = await getAdminCoursesListApi()

    if (courses.status === "error") {
        return <p>ddd</p>
    }


    return (
        <>
            {courses?.data.length === 0 ? <EmptyState title='لا يوجد كورسات'
                description='لا يوجد كورسات متاحة حالياً، يمكنك إضافة كورس جديد من خلال زر إضافة كورس جديد.'
                buttonText='إضافة كورس جديد'
                href='/admin/courses/create'
            /> :
                <div className="grid grid-cols-4  gap-7 mt-4">
                    {courses?.data.map((course) => (
                        <AdminCourseCard key={course.id} data={course} />
                    ))}
                </div>
            }
        </>
    )
}



export default ListAdminCards