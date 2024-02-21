"use client";

import { MdClose } from "react-icons/md";
import { formOpenStore } from "@/stores/taskstore";
import { useAtom } from "jotai";
import { createTask } from "@/actions/createTask";
import { redirect, useSearchParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

interface TaskFormProps {
    boardId: string;
}

export default function Page({ params }: any) {
    const [formOpen, setFormOpen] = useAtom(formOpenStore);
    const searchParams = useSearchParams();

    const createTaskId = createTask.bind(
        null,
        searchParams.get("boardId") as string
    );

    const callToCreateTask = (formData: FormData) => {
        createTaskId(formData);
        redirect(`/board/${searchParams.get("boardId") as string}`);
    };

    return (
        <div className="flex flex-col justify-center items-center h-svh">
            <Link
                href={`/board/${searchParams.get("boardId")}`}
                className="absolute top-24 left-5 flex gap-3 items-center group"
            >
                <MdArrowBack className="text-3xl hover:-translate-x-1 transition" />
                <span className="hidden group-hover:block font-semibold">
                    Back to board
                </span>
            </Link>

            <div className="border p-10 w-2/5 rounded-lg bg-white dark:bg-neutral-950 dark:border-neutral-700">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-10">
                    Create new task
                </h1>
                <form action={callToCreateTask} className="flex flex-col gap-5">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Task name"
                            className="px-4 py-3 border rounded-lg dark:bg-neutral-950 dark:border-neutral-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Description:</label>
                        <textarea
                            name="description"
                            rows={5}
                            placeholder="Task description"
                            className="px-4 py-3  border rounded-lg dark:bg-neutral-950 dark:border-neutral-700  w-full"
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Status:</label>
                        <select
                            name="status"
                            className="px-4 py-3 border rounded-lg w-full dark:bg-neutral-950 dark:border-neutral-700"
                        >
                            <option selected disabled>
                                Choose a Status
                            </option>
                            <option value="todo">To-Do</option>
                            <option value="wip">Work In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Importance:</label>
                        <select
                            name="importance"
                            className="px-4 py-3  border rounded-lg w-full dark:bg-neutral-950 dark:border-neutral-700"
                        >
                            <option selected disabled>
                                Choose the priority
                            </option>

                            <option value="rec_cn7580nmpsqufoolsncg">
                                Loose
                            </option>
                            <option value="rec_cn757vip4nuu258avur0">
                                Important
                            </option>
                            <option value="rec_cn7582ap4nuu258avurg">
                                Urgent
                            </option>
                        </select>
                    </div>
                    <button className="bg-neutral-900 p-3 text-white font-semibold rounded-lg dark:bg-white dark:text-black">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
