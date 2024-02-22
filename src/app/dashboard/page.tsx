import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";
import { clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { MdAdd, MdEdit } from "react-icons/md";
import Editboard from "@/components/Editboard";
import BoardCard from "@/components/BoardCard";

interface pageProps {}

export default async function page({}) {
    revalidatePath("/dashboard");
    const { userId } = auth();
    const xataClient = getXataClient();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);
    const boards = await xataClient.db.Boards.filter({
        user: userId,
    })
        .sort("xata.createdAt", "desc")
        .getMany();

    console.log(boards);

    return (
        <div className="flex flex-col gap-5 h-screen dark:text-white">
            <div className="flex flex-col gap-7 sm:flex-row justify-between">
                <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white">
                    Welcome, {user?.firstName}
                    {user?.lastName}
                </h1>
                <Link
                    href={"/board/create"}
                    className="flex gap-1 items-center p-3 font-semibold bg-neutral-950 text-white rounded-lg hover:bg-white hover:text-black border border-neutral-900 transition-colors ease-out
                        dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-950 dark:hover:text-white"
                >
                    <MdAdd className="text-xl"></MdAdd>Create New Board
                </Link>
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Your boards ({boards.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {boards.map((board) => (
                    <BoardCard
                        key={board.id}
                        id={board.id}
                        name={board.name as string}
                        createdAt={board.xata.createdAt}
                    ></BoardCard>
                ))}
            </div>
        </div>
    );
}
