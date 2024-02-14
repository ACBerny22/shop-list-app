import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

interface pageProps {}

export default async function page({}) {
    const { userId } = auth();
    console.log(userId);
    const xataClient = getXataClient();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);
    const lists = await xataClient.db.Boards.filter({
        user: userId,
    }).getMany();

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 sm:flex-row justify-between">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-700">
                    Welcome, {user?.firstName}
                    {user?.lastName}!
                </h1>
                <button className="p-3 font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ease-out">
                    Create New Board
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {lists.map((list) => (
                    <Link
                        href={`/board/${list.id}`}
                        key={list.id}
                        className="border p-5 rounded-lg shadow-lg"
                    >
                        <h1 className="mb-5 font-semibold text-slate-700">
                            {list.name}
                        </h1>
                        <span className="text-sm rounded-full text-slate-400">
                            {list.xata.createdAt.toDateString()}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
