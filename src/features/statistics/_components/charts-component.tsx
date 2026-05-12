"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BookOpen, TrendingUp } from "lucide-react";
import { CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, BarChart, Bar, Cell } from "recharts"
import { IRegistrationChart } from "../types/statistics";
import { useTheme } from "next-themes";

interface IProps {
  CountCoursesPaid: number;
  CountCoursesFree: number;
  charts: {
    registrations_last_12_months: IRegistrationChart[]
  }
}

const ChartsComponent = ({ charts, CountCoursesPaid, CountCoursesFree }: IProps) => {

  const { theme } = useTheme()
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
    { name: 'كورسات مدفوعة', value: CountCoursesPaid, color: '#fe9a00' },
    { name: 'كورسات مجانية', value: CountCoursesFree, color: '#59A1BE' }
  ];
  return (
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
  )
}

export default ChartsComponent