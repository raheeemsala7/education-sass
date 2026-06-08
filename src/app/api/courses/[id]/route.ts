import { getSingleAdminCourseDetailApi } from "@/features/course/apis/courses.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    const { id } = await context.params


    const payload = await getSingleAdminCourseDetailApi({ req, id });     

    return NextResponse.json(payload);

}