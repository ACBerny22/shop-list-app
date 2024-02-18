import { Task } from "@/xata";
import Taskcard from "./Taskcard";

interface DropzoneProps {
    tasks: any[];
    status: string;
    handleOnDrag: any;
    handleTouchStart: any;
    title: string;
    color: string;
}

export default function Dropzone({
    tasks,
    status,
    handleOnDrag,
    title,
    color,
}: DropzoneProps) {
    return (
        <>
            <div className={`w-full h-2 ${color} rounded-t-lg `}></div>
            <div className="p-10">
                <div className="flex items-center justify-between gap-10 dark:text-white">
                    <h1 className="text-2xl">{title}</h1>
                    <span className="text-xl font-semibold">
                        {tasks.filter((task) => task.status === status).length}
                    </span>
                </div>
                <hr className="my-8 h-0.5 border-t-0 bg-neutral-300 opacity-100" />
                <div className="flex flex-col overflow-auto ">
                    {tasks
                        .filter((task) => task.status === status)
                        ?.map((task) => (
                            <div
                                key={task.id}
                                draggable
                                onDragStart={(e) => handleOnDrag(e, task.id)}
                                onTouchStart={(e) => handleOnDrag(e, task)}
                                onTouchMove={(e) => e.preventDefault()}
                                className=""
                            >
                                <Taskcard
                                    id={task.id}
                                    name={task.name}
                                    description={task.description}
                                    importance={task.importance}
                                    date={task.xata.createdAt}
                                />
                            </div>
                        ))}{" "}
                </div>
            </div>
        </>
    );
}
