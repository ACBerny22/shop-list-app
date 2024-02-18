"use client";
import { FC } from "react";
import { MdEdit } from "react-icons/md";

interface EditboardProps {}

export default function Editboard({}) {
    return (
        <button
            onClick={() => {
                console.log("Edit");
            }}
            className="opacity-0 group-hover:opacity-100 transition ease-out"
        >
            <MdEdit className="text-lg text-neutral-900 dark:text-white"></MdEdit>
        </button>
    );
}
