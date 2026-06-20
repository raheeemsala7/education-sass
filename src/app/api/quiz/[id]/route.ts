import { getQuizDetailsApi } from "@/features/quiz/apis/quiz.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {

    const { id } = await context.params


    const payload = await getQuizDetailsApi({ req, quizId:id });     

    return NextResponse.json(payload);

}