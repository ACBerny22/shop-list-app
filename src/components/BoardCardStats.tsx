"use client";

import { Task } from "@/xata";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskByBoard } from "@/actions/fetchTask";

interface BoardCardStatsProps {
    id: string;
}

const calculateProgress = (taskos: Task[]) => {
    if (taskos.length === 0) {
        return 0;
    }

    const totalTasks = taskos.length;
    const doneTasks = taskos.filter((task) => task.status === "done").length;
    return (doneTasks / totalTasks) * 100;
};

const calculatePercentage = (taskos: Task[]) => {
    let persentage = { todo: 0, wip: 0, done: 0 };

    if (taskos.length === 0) {
        return persentage;
    }

    const totalTasks = taskos.length;

    const todoTasks = taskos.filter((task) => task.status === "todo").length;
    const wipTasks = taskos.filter((task) => task.status === "wip").length;
    const doneTasks = taskos.filter((task) => task.status === "done").length;

    persentage.todo = (todoTasks / totalTasks) * 100;
    persentage.wip = (wipTasks / totalTasks) * 100;
    persentage.done = (doneTasks / totalTasks) * 100;

    console.log(persentage);
    return persentage;
};

export default function BoardCardStats({ id }: BoardCardStatsProps) {
    const [tasksToCheck, setTasksToCheck] = useState<any[]>([]);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["tasks", id],
        queryFn: () => fetchTaskByBoard(id),
        refetchOnWindowFocus: false,
    });

    /*useEffect(() => {
        const fetchData = async () => {
            // Fetch data based on the id
            const data = await fetchTaskByBoard(id);
            // Update component state or do something with the data
            setTasksToCheck(data);
        };

        fetchData();
    }, [id]);*/

    if (isLoading || isFetching) return <p>Loading...</p>;

    const percentages = calculatePercentage(data as Task[]);

    return (
        <div>
            <span className="font-semibold">
                {Math.trunc(calculateProgress(data as Task[]))}%
            </span>
            <div className="py-3">
                <div style={{ position: "relative" }}>
                    {/* First segment */}
                    <div
                        className="dark:bg-lime-400 bg-lime-300/80 h-2 rounded-full"
                        style={{
                            width: `${percentages.done}%`,
                            position: "absolute",
                            left: "0%",
                        }}
                    ></div>

                    {/* Second segment */}
                    <div
                        className="dark:bg-amber-400 bg-amber-300/80 h-2 rounded-full"
                        style={{
                            width: `${percentages.wip}%`,
                            position: "absolute",
                            left: `${percentages.done}%`,
                        }}
                    ></div>

                    {/* Third segment */}
                    <div
                        className="dark:bg-sky-400 bg-sky-300/80 h-2 rounded-full"
                        style={{
                            width: `${percentages.todo}%`,
                            position: "absolute",
                            left: `${percentages.done + percentages.wip}%`,
                        }}
                    ></div>
                </div>
                {/*
                    
                <div style={{ position: "relative" }}>
                    <div
                        className="dark:bg-neutral-800 bg-neutral-200 h-2 rounded-full mt-2"
                        style={{
                            width: "100%",
                            position: "absolute",
                            zIndex: 1,
                        }}
                        ></div>

                    <div
                        className={`dark:${
                            calculateProgress(data as Task[]) <= 50.0
                            ? `bg-sky-400`
                            : calculateProgress(data as Task[]) >= 100
                            ? `bg-lime-400`
                            : `bg-amber-400`
                        } bg-neutral-950 h-2 rounded-full mt-2`}
                        style={{
                            width: `${calculateProgress(data as Task[])}%`,
                            position: "absolute",
                            zIndex: 2,
                        }}
                        ></div>
                </div>
                        */}
            </div>
        </div>
    );
}
