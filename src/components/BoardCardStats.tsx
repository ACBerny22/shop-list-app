"use client";

import { FC, useEffect } from "react";
import { Task } from "@/xata";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskByBoard } from "@/actions/fetchTask";

interface BoardCardStatsProps {
    tasks: any[];
}

export default function BoardCardStats({ tasks }: BoardCardStatsProps) {
    const [done, setNotDone] = useState<number>(0);

    const calculateProgress = () => {
        if (tasks.length === 0) {
            return 0;
        }

        const totalTasks = tasks.length;
        const doneTasks = tasks.filter((task) => task.status === "done").length;
        return (doneTasks / totalTasks) * 100;
    };

    useEffect(() => {
        // Call the countNotDoneTasks function whenever tasks are updated
        calculateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <span className="font-light">
                {Math.trunc(calculateProgress())}%
            </span>
            <div
                className="dark:bg-white bg-neutral-950 h-2 rounded-full mt-2"
                style={{ width: `${calculateProgress()}%` }}
            ></div>
        </div>
    );
}
