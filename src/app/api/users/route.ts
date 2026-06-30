import { getAllUsersApi } from "@/features/users/apis/users.api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest ) {
    const res = await getAllUsersApi(req)
    return NextResponse.json(res)
}