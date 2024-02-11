import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
interface pageProps {}

export default async function page({}) {
    const { userId } = auth();
    console.log(userId);
    const xataClient = getXataClient();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);
    const lists = await xataClient.db.List.filter({
        user: userId,
    }).getMany();

    return (
        <div className="flex flex-col gap-10">
            <div className="text-2xl lg:text-3xl font-bold text-slate-700">
                Welcome, {user?.firstName}
                {user?.lastName}!
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {lists.map((list) => (
                    <div key={list.id} className="border p-5 rounded-lg">
                        <div>{list.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
