import { Task } from "@/xata";
import Taskcard from "./Taskcard";
import Link from "next/link";

interface DropzoneProps {
    tasks: any[];
    status: string;
    handleOnDrag: any;
    title: string;
    color: string;
    icon: any;
}

export default function Dropzone({
    tasks,
    status,
    handleOnDrag,
    title,
    color,
    icon,
}: DropzoneProps) {
    return (
        <>
            <div className={`w-full h-2 ${color} rounded-t-lg `}></div>
            <div className="p-8">
                <div className="flex items-center justify-between dark:text-white">
                    {icon}
                    <h1 className="text-2xl">{title}</h1>
                    <span className="text-2xl font-semibold">
                        {tasks.filter((task) => task.status === status).length}
                    </span>
                </div>
                <hr className="my-5 h-[1px] border-t-0 bg-neutral-300 opacity-100 dark:bg-neutral-500" />
                <div className="flex flex-col overflow-auto ">
                    {tasks.filter((task) => task.status === status).length <=
                        0 && (
                        <span className=" text-center text-xl mt-10 font-light text-neutral-400 dark:text-neutral-600">
                            Nothing over here...Yet
                        </span>
                    )}
                    {tasks
                        .filter((task) => task.status === status)
                        ?.map((task) => (
                            <Link
                                href={{
                                    pathname: `/task/${task.id}`,
                                }}
                                key={task.id}
                                draggable
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                                className=""
                            >
                                <Taskcard
                                    id={task.id}
                                    name={task.name}
                                    description={task.description}
                                    importance={task.importance}
                                    date={task.xata.createdAt}
                                />
                            </Link>
                        ))}{" "}
                </div>
            </div>
        </>
    );
}
