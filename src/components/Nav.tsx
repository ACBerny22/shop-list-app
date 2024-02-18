"use client";

import Link from "next/link";
import { UserButton, auth, useUser } from "@clerk/nextjs";
import { MdSpaceDashboard, MdArrowBack } from "react-icons/md";
import ThemeSwitch from "./ThemeSwitch";

interface NavProps {}

export default function Nav({}) {
    const { user, isLoaded } = useUser();

    return (
        <>
            {user && (
                <nav className="flex justify-between items-center p-5 border-b dark:border-neutral-800 bg-white shadow-md dark:bg-neutral-950 dark:text-white">
                    <Link
                        href={"/"}
                        className="font-bold text-lg text-neutral-800 flex gap-2 items-center dark:text-white"
                    >
                        <MdSpaceDashboard className="text-2xl" />
                        <span className="hidden md:block">EasyKanBan</span>
                    </Link>
                    <div className="flex gap-6">
                        <ThemeSwitch></ThemeSwitch>
                        {isLoaded && user && (
                            <div className="flex gap-5 items-center">
                                <Link
                                    className="hidden md:block bg-transparent text-neutral-900 px-3 py-1 rounded-lg text-sm font-semibold border border-neutral-900 hover:text-white hover:bg-neutral-900 transition ease-out
                                    dark:text-white dark:hover:bg-white dark:hover:text-black"
                                    href={"/dashboard"}
                                >
                                    Dashboard
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
}
