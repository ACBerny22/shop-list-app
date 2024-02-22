"use client";

import { useQuery } from "@tanstack/react-query";
import { taskStore, formOpenStore } from "@/stores/taskstore";
import { Task } from "@/xata";
import { useAtom } from "jotai";
import Link from "next/link";
import { MdArrowBack, MdAdd } from "react-icons/md";
import { startTransition, useEffect } from "react"; // Import debounce function from lodash
import debounce from "lodash.debounce";
import LoadingSpinner from "@/components/LoadingSpinner";
import Dropzone from "@/components/Dropzone";
import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";

interface pageProps {
    params: {
        id: string;
    };
}

export default function Page({ ...props }: pageProps) {
    const getBoardInfo = async () => {
        const data = await fetch(`/api/board/${props.params.id}`);
        const json = await data.json();

        const tasks = await fetch(
            `/api/tasks?` +
                new URLSearchParams({
                    boardId: props.params.id,
                })
        );

        const json2 = await tasks.json();
        setTasks(json2.content);

        return json;
    };

    const { isLoading, data, isFetching } = useQuery({
        queryKey: ["board"],
        queryFn: getBoardInfo,
        refetchOnWindowFocus: false,
    });
    const [tasks, setTasks] = useAtom(taskStore);
    const router = useRouter();
    const draggedItem = useRef<Task | null>(null);

    function handleOnDrag(event: React.DragEvent, id: string) {
        event.dataTransfer.setData("id", id);
    }

    const handleTouchStart = (e: React.TouchEvent, task: Task) => {
        e.preventDefault();
        draggedItem.current = task;
    };

    const handleDrop = (e: React.DragEvent, newStatus: string) => {
        e.preventDefault();

        const taskId = e.dataTransfer.getData("id") as string;
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );

        setTasks(updatedTasks);
    };

    const debouncedUpdateTasks = debounce((updatedTasks: Task[]) => {
        // Implement your logic to update tasks in the database
        const apiUrl = "/api/tasks";

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Add any other headers as needed
            },
            body: JSON.stringify(updatedTasks),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Handle the response if needed
                return response.json();
            })
            .then((data) => {
                // Handle the successful response if needed
                console.log("Tasks updated successfully:", data);
            })
            .catch((error) => {
                // Handle errors
                console.error("Error updating tasks:", error);
            });
    }, 1000); // Adjust the delay time as needed

    useEffect(() => {
        // Call the debounced function whenever tasks are updated
        debouncedUpdateTasks(tasks);
        // Cleanup the debounced function on component unmount
        return () => debouncedUpdateTasks.cancel();
    }, [tasks, debouncedUpdateTasks]);

    const backDashboard = () => {
        startTransition(() => router.push("/dashboard"));
        startTransition(() => router.refresh());
    };

    if (isLoading || isFetching) {
        return <LoadingSpinner size="big" full={true} />;
    }

    return (
        <>
            <section className="flex flex-col gap-10 dark:text-white">
                <TaskForm boardId={props.params.id}></TaskForm>
                <div className="flex flex-col gap-7 sm:flex-row  justify-between ">
                    <div className="flex gap-3 items-center text-neutral-800 dark:text-white">
                        <Link href={"/dashboard"}>
                            <MdArrowBack className="text-3xl hover:-translate-x-1 transition" />
                        </Link>
                        <h1 className="text-3xl font-bold ">
                            {data.content.name}
                        </h1>
                    </div>
                    <Link
                        href={{
                            pathname: "/task/create_task",
                            query: {
                                boardId: props.params.id,
                            },
                        }}
                        className="flex gap-1 items-center p-3 font-semibold bg-neutral-950 text-white rounded-lg hover:bg-white hover:text-black border border-neutral-900 transition-colors ease-out
                        dark:text-neutral-950 dark:bg-white dark:hover:bg-neutral-950 dark:hover:text-white"
                    >
                        <MdAdd className="text-xl"></MdAdd> Create New Task
                    </Link>
                </div>
                <div className="grid lg:grid-cols-3 gap-5 text-neutral-800 ">
                    <div
                        className="shadow-lg h-screen rounded-lg bg-white overflow-auto dark:bg-[#080808]  border dark:border-neutral-800"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "todo")}
                    >
                        <Dropzone
                            title="To-do"
                            //color="bg-black dark:bg-white"
                            color="bg-sky-300/70 dark:bg-sky-400"
                            tasks={tasks}
                            handleOnDrag={handleOnDrag}
                            status="todo"
                            icon={
                                <MdOutlinePending className="text-3xl text-neutral-800 dark:text-neutral-100" />
                            }
                        ></Dropzone>
                    </div>
                    <div
                        className="shadow-lg h-screen rounded-lg bg-white overflow-auto dark:bg-[#080808] border dark:border-neutral-800"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "wip")}
                    >
                        <Dropzone
                            tasks={tasks}
                            title="Work in progress"
                            //color="bg-slate-500 dark:bg-white"
                            color="bg-amber-300/70 dark:bg-amber-400"
                            handleOnDrag={handleOnDrag}
                            status="wip"
                            icon={
                                <GrInProgress className="text-3xl text-neutral-800 dark:text-neutral-100" />
                            }
                        ></Dropzone>
                    </div>
                    <div
                        className="shadow-lg h-screen rounded-lg bg-white overflow-auto dark:bg-[#080808] border dark:border-neutral-800"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, "done")}
                    >
                        <Dropzone
                            tasks={tasks}
                            title="Done"
                            //color="bg-slate-700 dark:bg-white"
                            color="bg-lime-300/70 dark:bg-lime-400"
                            handleOnDrag={handleOnDrag}
                            status="done"
                            icon={
                                <IoMdDoneAll className="text-3xl text-neutral-800 dark:text-neutral-100" />
                            }
                        ></Dropzone>
                    </div>
                </div>
            </section>
        </>
    );
}
