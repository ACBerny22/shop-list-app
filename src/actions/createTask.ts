"use server";
import { getXataClient } from "@/xata";

export async function createTask(boardId: string, formData: FormData) {
    const xata = getXataClient();

    const task = await xata.db.Task.create({
        name: formData.get("name") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
        board: boardId as string,
        importance: formData.get("importance") as string,
    });

    return task;
}
