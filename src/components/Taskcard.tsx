"use client";

interface TaskcardProps {
    id?: string;
    name?: any;
    description?: any;
    importance?: any;
    date: Date;
}

export default function Taskcard({ ...props }: TaskcardProps) {
    return (
        <div className="p-5 my-4 mx-3 shadow-lg rounded-lg cursor-pointer border border-transparent hover:border-neutral-900 dark:bg-neutral-900 dark:text-white">
            <h1 className="text-lg font-semibold text-neutral-800 dark:text-white">
                {props?.name}
            </h1>
            <h3 className="font-light">{props?.description}</h3>
            <div className="flex justify-between mt-10">
                <span className="text-neutral-500 text-sm">
                    {new Date(props.date).toLocaleDateString()}
                </span>
                <span className=" bg-neutral-900 py-1 px-3 rounded-lg text-sm text-white font-semibold dark:text-neutral-950 dark:bg-white">
                    {props?.importance.Level}
                </span>
            </div>
        </div>
    );
}
