"use server";

import { getXataClient } from "@/xata";

export async function editTask(taskId: string, formData: FormData) {
    const xata = getXataClient();

    console.log(formData);
    console.log(taskId);

    const record = await xata.db.Task.update(taskId as any, {
        name: formData.get("name") as string,
        status: formData.get("status") as string,
        description: formData.get("description") as string,
        importance: formData.get("importance") as string,
    });
}
