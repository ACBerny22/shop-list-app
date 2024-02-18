import { NextRequest, NextResponse } from "next/server";
import { Task, XataClient, getXataClient } from "@/xata";
import { TaskTransaction } from "@/types/taskType";

export async function GET(request: NextRequest) {
    const boardId = request.nextUrl.searchParams.get("boardId");
    let tasks;
    if (boardId) {
        console.log(boardId);
        const xataClient = getXataClient();
        tasks = await xataClient.db.Task.filter({
            "board.id": boardId,
        })
            .select(["*", "importance.*", "xata.createdAt"])
            .getMany();
        console.log(tasks);
    }

    return NextResponse.json({
        content: tasks,
    });
}

export async function PUT(request: NextRequest) {
    const data = await request.json();
    const xata = getXataClient();
    const toTransaction: TaskTransaction[] = [];

    data.map((task: Task) => {
        toTransaction.push({
            update: {
                table: "Task",
                id: task.id,
                fields: { status: task.status },
            },
        });
    });
    console.log(toTransaction);

    const result = await xata.transactions.run(toTransaction as any);

    console.log(result);
    return result;
}
