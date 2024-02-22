"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { editTask } from "@/actions/editTask";
import { fetchTaskById } from "@/actions/fetchTask";
import EditTaskForm from "@/components/EditTaskForm";
import { revalidatePath } from "next/cache";

interface PageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: PageProps) {
    return (
        <div className="flex flex-col justify-center items-center h-svh">
            <Link
                href={``}
                className="absolute top-24 left-5 flex gap-3 items-center group"
            >
                <MdArrowBack className="text-3xl hover:-translate-x-1 transition" />
                <span className="hidden group-hover:block font-semibold">
                    Back to board
                </span>
            </Link>
            <EditTaskForm id={params.id}></EditTaskForm>
        </div>
    );
}
