"use server";
import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

export async function createBoard(userId: string, formData: FormData) {
    const xata = getXataClient();

    const record = await xata.db.Boards.create({
        name: formData.get("name") as string,
        user: userId as string,
    });
    revalidatePath("/dashboard");

    return record;
}
