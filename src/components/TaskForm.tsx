"use client";

import { MdClose } from "react-icons/md";
import { formOpenStore } from "@/stores/taskstore";
import { useAtom } from "jotai";
import { createTask } from "@/actions/createTask";

interface TaskFormProps {
    boardId: string;
}

export default function TaskForm({ boardId }: TaskFormProps) {
    const [formOpen, setFormOpen] = useAtom(formOpenStore);

    const createTaskId = createTask.bind(null, boardId);

    const callToCreateTask = (formData: FormData) => {
        createTaskId(formData);
        setFormOpen(false);
    };

    return (
        <>
            {formOpen && (
                <dialog
                    className="flex flex-col gap-20 justify-center items-center h-screen border rounded-lg w-3/4"
                    open={formOpen}
                    key={222}
                >
                    <button
                        onClick={() => {
                            setFormOpen(false);
                        }}
                        className="absolute right-10 top-10 text-2xl"
                    >
                        <MdClose></MdClose>
                    </button>
                    <div className="text-center">
                        <h1 className="text-xl font-semibold text-neutral-900  mb-10">
                            Create new task
                        </h1>
                        <form
                            action={callToCreateTask}
                            className="flex flex-col gap-5"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Task name"
                                    className="p-5 border rounded-lg"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Task description"
                                    className="p-5 border rounded-lg"
                                />
                            </div>
                            <div>
                                <select
                                    name="status"
                                    className="p-5 border rounded-lg w-full"
                                >
                                    <option selected disabled>
                                        Choose a Status
                                    </option>
                                    <option value="todo">To-Do</option>
                                    <option value="wip">
                                        Work In Progress
                                    </option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    name="importance"
                                    className="p-5 border rounded-lg w-full"
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
                            <button className="bg-neutral-900 p-3 text-white font-semibold rounded-lg">
                                Create
                            </button>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
}
