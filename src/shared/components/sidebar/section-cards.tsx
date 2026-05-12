"use client"
import { IconBook, IconPlaylistX, IconShoppingCart, IconUsers } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { BookOpen, Calendar, CreditCard, ScrollText, TrendingUp, UserPlus } from "lucide-react"
// import { useDashboardStatsQuery } from "@/hooks/use-admin"
import { CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, BarChart, Bar, Cell } from "recharts"
import { useTheme } from "next-themes"



export function SectionCards() {


  const { theme } = useTheme()

  const { data: dashboardStats, isLoading, isError } = useDashboardStatsQuery()


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!dashboardStats?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">حدث خطأ أثناء تحميل البيانات</p>
        </div>
      </div>
    );
  }

  const { charts, courses, students, quizzes, last_students, last_enrollments } = dashboardStats?.data


  const monthNames = {
    '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'أبريل',
    '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
    '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
  };

  type MonthKey =
    | '01' | '02' | '03' | '04'
    | '05' | '06' | '07' | '08'
    | '09' | '10' | '11' | '12';
  const registrationData = charts.registrations_last_12_months.map(item => {
    const monthKey = item.month.split('-')[1] as MonthKey;
    return {
      month: monthNames[monthKey],
      عدد_الطلاب: item.total
    };
  });
  const courseTypeData = [
    { name: 'كورسات مدفوعة', value: courses.paid, color: '#fe9a00' },
    { name: 'كورسات مجانية', value: courses.free, color: '#59A1BE' }
  ];

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
            <IconUsers className="size-6 text-muted-foreground" />
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

            <IconBook className="size-8 text-muted-foreground" />
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
            <p className="text-muted-foreground">Registered users on the platform</p>
          </CardFooter>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <Card className="transform transition-all duration-700 hover:shadow-xl" style={{ transitionDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              تسجيلات الطلاب (آخر 12 شهر)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme === 'dark' ? '#fff' : '#6b7280' }} />
                <YAxis allowDecimals={false} tick={{ fill: theme === 'dark' ? '#fff' : '#6b7280', fontSize: 17, fontWeight: 'bold' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#080C14' : '#F3F4F6', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="عدد_الطلاب"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={2000}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>



        <Card className="transform transition-all duration-700 hover:shadow-xl" style={{ transitionDelay: '600ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              توزيع الكورسات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: theme === 'dark' ? '#fff' : '#6b7280' }} />
                <YAxis allowDecimals={false} tick={{ fill: theme === 'dark' ? '#fff' : '#6b7280', fontSize: 17, fontWeight: 'bold' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                  animationBegin={0}
                  onMouseEnter={() => { }}
                  onMouseLeave={() => { }}

                >
                  {courseTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>


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
