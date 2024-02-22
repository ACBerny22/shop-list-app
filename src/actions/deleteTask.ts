"use server";

import { getXataClient } from "@/xata";

export async function deleteTask(taskId: string) {
    const xata = getXataClient();
    const record = await xata.db.Task.delete(taskId);
}
