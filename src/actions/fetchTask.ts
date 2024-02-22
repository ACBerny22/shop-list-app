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

export async function fetchTaskById(id: string) {
    const xata = getXataClient();
    const task = await xata.db.Task.read({ id });
    return task;
}
