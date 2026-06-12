import { getStatisticsApi } from "@/features/statistics/apis/statistics.api"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { BookOpen, Calendar, CreditCard, ScrollText, UserPlus, Users } from "lucide-react"
import { CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, BarChart, Bar, Cell } from "recharts"
import ChartsComponent from "./charts-component"


export async function SectionCards() {
  
const theme = "dark"
  const statistics = await getStatisticsApi()
  
  
  
  if (!statistics.status) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">حدث خطأ أثناء تحميل البيانات</p>
        </div>
      </div>
    );
  }
  console.log(statistics.data)
  
  const { charts, courses, students, quizzes, last_students,last_enrollments } = statistics?.data




  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <Card className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription> عدد الطلاب مسجلين</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {students?.total}
              </CardTitle>
            </div>
            <Users className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">Registered users on the platform</p>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>عدد الكورسات المضافة</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {courses?.total}
              </CardTitle>
            </div>

            <BookOpen className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">
              Available courses on the the platform
            </p>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>اجمالي عدد الاختبارات</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {quizzes?.total}
              </CardTitle>
            </div>
            <ScrollText className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">
              Total learning content available
            </p>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardDescription>عدد الطلاب المشتركين</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {courses?.paid}
              </CardTitle>
            </div>
            <UserPlus className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <p className="text-muted-foreground">عدد الطلاب المشتركين</p>
          </CardFooter>
        </Card>
      </div>


      <ChartsComponent charts={charts} CountCoursesPaid={courses?.paid} CountCoursesFree={courses?.free} />



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Last Students */}
        <Card className="transform transition-all duration-700 hover:shadow-xl" style={{ transitionDelay: '700ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              آخر الطلاب المسجلين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {last_students.map((student, index) => (
                <div
                  key={student.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 transform transition-all hover:scale-102 hover:shadow-md"
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">#{student.id}</span>
                  </div>
                  <p className="text-sm text-gray-600">📱 {student.phone}</p>
                  {student.email && <p className="text-sm text-gray-600">✉️ {student.email}</p>}
                  <p className="text-xs text-gray-500 mt-2">📅 {student.created_at}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Enrollments */}
        <Card className="transform transition-all duration-700 hover:shadow-xl" style={{ transitionDelay: '800ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              آخر الاشتراكات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {last_enrollments.map((enrollment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 transform transition-all hover:scale-102 hover:shadow-md"
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{enrollment.student_name}</h3>
                    <span className="text-sm font-bold text-green-600">{enrollment.paid_amount} ج.م</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">📚 {enrollment.course_title}</p>
                  <p className="text-xs text-gray-500">📅 {enrollment.enrolled_at}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


    </>
  )
}
