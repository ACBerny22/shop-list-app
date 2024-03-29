"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "@/actions/fetchTask";
import LoadingSpinner from "./LoadingSpinner";
import { editTask } from "@/actions/editTask";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { deleteTask } from "@/actions/deleteTask";

interface EditTaskFormProps {
    id: string;
}

export default function EditTaskForm({ id }: EditTaskFormProps) {
    const { data, error, isLoading, isFetching, isSuccess } = useQuery({
        queryKey: ["task"],
        queryFn: () => fetchTaskById(id as string),
        refetchOnWindowFocus: false,
    });

    //task is data.
    console.log(id);

    const [formData, setFormData] = useState({
        name: data?.name,
        description: data?.description,
        status: data?.status,
        importance: data?.importance?.id,
    });

    const router = useRouter();

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const callToDeleteTask = async () => {
        await deleteTask(id as string);
        router.back();
    };

    useEffect(() => {
        if (isSuccess) {
            setFormData({
                name: data?.name,
                description: data?.description,
                status: data?.status,
                importance: data?.importance?.id,
            });
        }
    }, [isSuccess, data]);

    const editTaskWithId = editTask.bind(null, id as string);

    const callToEditTask = (formData: FormData) => {
        editTaskWithId(formData);
        router.back();
    };

    if (error) {
        return <div>Error: Couldnt fetch</div>;
    }

    if (isLoading || isFetching) {
        return <LoadingSpinner full={true} size={'big'}/>;
    }

    return (
        <div className="border p-10 w-4/5 lg:w-3/5 xl:w-2/5 rounded-lg bg-white dark:bg-neutral-950 dark:border-neutral-700">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Edit task
                </h1>
                <button onClick={callToDeleteTask}>
                    <MdDelete className="text-3xl text-red-500" />
                </button>
            </div>
            <form action={callToEditTask} className="flex flex-col gap-5">
                <div className="flex flex-col justify-start items-start gap-2">
                    <label className="font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name as string}
                        onChange={handleChange}
                        className="px-4 py-3 border rounded-lg dark:bg-neutral-950 dark:border-neutral-700 w-full"
                    />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <label className="font-semibold">Description:</label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description as string}
                        onChange={handleChange}
                        className="px-4 py-3  border rounded-lg dark:bg-neutral-950 dark:border-neutral-700  w-full"
                    />
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <label className="font-semibold">Status:</label>
                    <select
                        name="status"
                        value={formData.status as string}
                        onChange={handleChange}
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
                        value={formData.importance as string}
                        onChange={handleChange}
                        className="px-4 py-3  border rounded-lg w-full dark:bg-neutral-950 dark:border-neutral-700"
                    >
                        <option selected disabled>
                            Choose the priority
                        </option>

                        <option value="rec_cn7580nmpsqufoolsncg">Loose</option>
                        <option value="rec_cn757vip4nuu258avur0">
                            Important
                        </option>
                        <option value="rec_cn7582ap4nuu258avurg">Urgent</option>
                    </select>
                </div>
                <button className="bg-neutral-900 p-3 text-white font-semibold rounded-lg dark:bg-white dark:text-black">
                    Confirm
                </button>
            </form>
        </div>
    );
}
