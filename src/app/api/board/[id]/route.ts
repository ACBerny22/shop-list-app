import { NextRequest, NextResponse } from "next/server";
import { Task, XataClient, getXataClient } from "@/xata";
import { TaskTransaction } from "@/types/taskType";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const slug = params.id; // 'a', 'b', or 'c'
    const xata = getXataClient();
    const board = await xata.db.Boards.read(slug);

    return NextResponse.json({
        content: board,
    });
}
