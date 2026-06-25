"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Search, Trash2, Users } from 'lucide-react'
import React, { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Button } from '@/shared/components/ui/button'


const page = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useUsersQuery(search, page)



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

    if (!data?.data) {
        return <h4>not Found</h4>
    }
    const users = data.data
    const filteredUsers = users.filter(
        (user) =>
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.phone.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>

            <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                            إدارة المستخدمين
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            عرض وإدارة جميع المستخدمين المسجلين
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-3">
                    <div className="rounded-lg bg-card px-4 py-2 shadow-card">
                        <p className="text-xs text-muted-foreground">إجمالي المستخدمين</p>
                        <p className="text-xl font-bold text-foreground">{data?.meta.total}</p>
                    </div>
                    <div className="rounded-lg bg-card px-4 py-2 shadow-card">
                        <p className="text-xs text-muted-foreground">المدراء</p>
                        <p className="text-xl font-bold text-primary">
                            {/* {users.filter((u) => u.role === "admin").length} */}
                        </p>
                    </div>
                </div>

            </div>


              <Card className="shadow-soft border-0">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle className="text-lg font-semibold">
                            قائمة المستخدمين
                        </CardTitle>

                        {/* Search */}
                        <div className="relative max-w-sm">
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="البحث عن مستخدم..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pr-10 bg-background"
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-table-header hover:bg-table-header">
                                    <TableHead className="text-right font-semibold">الاسم</TableHead>
                                    <TableHead className="text-right font-semibold"> رقم الهاتف</TableHead>
                                    <TableHead className="text-center font-semibold">رقم الاب</TableHead>
                                    <TableHead className="text-center font-semibold">المدينه</TableHead>
                                    <TableHead className="text-center font-semibold">السنه الدراسيه</TableHead>
                                    <TableHead className="text-center font-semibold">الإجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >
                                {filteredUsers.length === 0 ? (
                                    <TableRow className="p-4">
                                        <TableCell colSpan={5} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="h-10 w-10 text-muted-foreground/50" />
                                                <p className="text-muted-foreground">لا يوجد مستخدمين</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            className="animate-slide-up transition-colors hover:bg-table-hover"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <TableCell className="font-medium">{user.first_name} {user.last_name}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.phone}
                                            </TableCell>
                                            <TableCell className="text-center">
                                               {user.father_phone}
                                            </TableCell>
                                            <TableCell className="text-center">
                                               {user.city}
                                            </TableCell>
                                            <TableCell className="text-center">
                                               {user.grade}
                                            </TableCell>
                                          
                                            <TableCell className="text-center">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    // onClick={() => handleDelete(user._id)}
                                                    className="gap-2 transition-all hover:scale-105"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="hidden sm:inline">حذف</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            عرض {filteredUsers.length} من {users.length} مستخدم
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1 || !data?.meta.last_page}
                                onClick={() => setPage((p) => p - 1)}
                                className="gap-1"
                            >
                                <ChevronRight className="h-4 w-4" />
                                السابق
                            </Button>

                            <div className="flex items-center gap-1">
                                <span className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                                    {page}
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === data?.meta.last_page}
                                onClick={() => setPage((p) => p + 1)}
                                className="gap-1"
                            >
                                التالي
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>


        </>
    )
}

export default page