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
        <div className="flex justify-center items-center h-screen">
            <Link
                href={`/board/${searchParams.get("boardId")}`}
                className="absolute top-24 left-5 flex gap-3 items-center group"
            >
                <MdArrowBack className="text-3xl hover:-translate-x-1 transition" />
                <span className="hidden group-hover:block font-semibold">Back to board</span>
            </Link>

            <div className="text-center">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white  mb-10">
                    Create new task
                </h1>
                <form action={callToCreateTask} className="flex flex-col gap-5">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Task name"
                            className="p-5 border rounded-lg dark:bg-black"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="description"
                            placeholder="Task description"
                            className="p-5 border rounded-lg dark:bg-black"
                        />
                    </div>
                    <div>
                        <select
                            name="status"
                            className="p-5 border rounded-lg w-full dark:bg-black"
                        >
                            <option selected disabled>
                                Choose a Status
                            </option>
                            <option value="todo">To-Do</option>
                            <option value="wip">Work In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="importance"
                            className="p-5 border rounded-lg w-full dark:bg-black"
                        >
                            <option selected disabled>
                                Choose the Improtance
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
