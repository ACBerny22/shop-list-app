"use client";

import { redirect } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createBoard } from "@/actions/createBoard";

export default function Page() {
    const { user, isLoaded } = useUser();

    if (!user) {
        redirect("/");
    }

    const createBoardId = createBoard.bind(null, user.id as string);

    const callToCreateBoard = (formData: FormData) => {
        createBoardId(formData);
        redirect(`/dashboard`);
    };

    return (
        <div className="flex flex-col justify-center items-center h-svh">
            <Link
                href={`/dashboard`}
                className="absolute top-24 left-5 flex gap-3 items-center group"
            >
                <MdArrowBack className="text-3xl hover:-translate-x-1 transition" />
                <span className="hidden group-hover:block font-semibold">
                    Back to dashboard
                </span>
            </Link>

            <div className="border p-10 w-2/5 rounded-lg bg-white dark:bg-neutral-950 dark:border-neutral-700">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        Create new board
                    </h1>
                    <p className="dark:text-neutral-400">
                        For your new amazing project.
                    </p>
                </div>
                <form
                    action={callToCreateBoard}
                    className="flex flex-col gap-5"
                >
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Board name"
                            className="px-4 py-3 border rounded-lg dark:bg-neutral-950 dark:border-neutral-700 w-full"
                        />
                    </div>
                    <button className="bg-neutral-900 p-3 text-white font-semibold rounded-lg dark:bg-white dark:text-black">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
