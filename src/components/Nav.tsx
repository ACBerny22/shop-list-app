"use client";

import Link from "next/link";
import { UserButton, auth, useUser } from "@clerk/nextjs";

interface NavProps {}

export default function Nav({}) {
    const { user, isLoaded } = useUser();

    return (
        <>
            {user && (
                <nav className="flex justify-between items-center p-5 border-b">
                    <Link
                        href={"/"}
                        className="font-bold text-lg text-slate-700"
                    >
                        EasyKanBan
                    </Link>
                    {isLoaded && user && (
                        <div className="flex gap-5 items-center">
                            <Link href={"/dashboard"}>Dashboard</Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    )}
                </nav>
            )}
        </>
    );
}
