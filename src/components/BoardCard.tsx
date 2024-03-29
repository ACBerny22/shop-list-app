import Link from "next/link";
import Editboard from "./Editboard";
import BoardCardStats from "./BoardCardStats";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { fetchTaskByBoard } from "@/actions/fetchTask";

interface BoardCardProps {
    id: string;
    name: string;
    createdAt: Date;
}

export default async function BoardCard({
    id,
    name,
    createdAt,
}: BoardCardProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["task"],
        queryFn: () => fetchTaskByBoard(id),
    });

    return (
        <Link
            href={`/board/${id}`}
            key={id}
            className="p-5 rounded-lg shadow-lg bg-white group border hover:border-neutral-400 dark:bg-neutral-950 dark:text-white dark:border-neutral-800 dark:hover:border-neutral-600"
        >
            <div className="flex justify-between items-center mb-5 dark:text-white">
                <h1 className="font-semibold text-neutral-800 dark:text-white text-lg">
                    {name}
                </h1>
                <Editboard></Editboard>
            </div>
            <span className="text-sm rounded-full text-neutral-400 dark:text-neutral-200">
                {createdAt.toDateString()}
            </span>
            <hr className="my-3 h-[1px] border-t-0 bg-neutral-300 dark:bg-neutral-800 opacity-100" />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <BoardCardStats id={id}></BoardCardStats>
            </HydrationBoundary>
        </Link>
    );
}
