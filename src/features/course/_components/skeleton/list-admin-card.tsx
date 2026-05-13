import { AdminCourseCardSkeleton } from "./admin-card";

function AdminCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7" >

      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default AdminCourseCardSkeletonLayout