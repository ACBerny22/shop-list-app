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

export default function BoardCardStats({ id }: BoardCardStatsProps) {
    const [tasksToCheck, setTasksToCheck] = useState<any[]>([]);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["tasks", id],
        queryFn: () => fetchTaskByBoard(id),
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

    return (
        <div>
            <span className="font-light">
                {Math.trunc(calculateProgress(data as Task[]))}%
            </span>
            <div
                className="dark:bg-white bg-neutral-950 h-2 rounded-full mt-2"
                style={{ width: `${calculateProgress(data as Task[])}%` }}
            ></div>
        </div>
    );
}
