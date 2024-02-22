import Link from "next/link";

interface TaskcardProps {
    id?: string;
    name?: any;
    description?: any;
    importance?: any;
    date: Date;
}

export default function Taskcard({ ...props }: TaskcardProps) {
    return (
        <div className="p-5 my-2 mx-3 shadow-md rounded-lg cursor-pointer border border-transparent hover:border-neutral-400 dark:bg-neutral-950 dark:text-white dark:border-neutral-800 dark:hover:border-neutral-600">
            <h1 className="text-lg font-semibold text-neutral-800 dark:text-white">
                {props?.name}
            </h1>
            <h3 className="font-light dark:text-neutral-300">
                {props?.description}
            </h3>
            <div className="flex justify-between mt-4">
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
