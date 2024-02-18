import { NextRequest, NextResponse } from "next/server";
import { Task, XataClient, getXataClient } from "@/xata";
import { TaskTransaction } from "@/types/taskType";

export async function GET(request: NextRequest) {
    const xata = getXataClient();
    const board = await xata.db.Boards.read();

    return NextResponse.json({
        content: board,
    });
}
