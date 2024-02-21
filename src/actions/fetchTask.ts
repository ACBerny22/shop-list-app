"use server";
import { getXataClient } from "@/xata";

export async function fetchTaskByBoard(board_id: string) {
    const xata = getXataClient();
    const tasks = await xata.db.Task.select(["status"])
        .filter({
            "board.id": board_id,
        })
        .getMany();
    return tasks;
}
