import { getAdminCoursesListApi } from "@/features/course/apis/courses.api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest ) {
    const res = await getAdminCoursesListApi(req)
    return NextResponse.json(res)
}