import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";

export default function Home() {
    const { userId } = auth();
    console.log(userId);
    return (
        <main className="flex flex-col justify-center items-center h-screen text-center px-5 lg:px-20 gap-20">
            <div className="flex flex-col justify-center items-center gap-7 ">
                <div className="flex gap-4 items-center dark:text-white">
                    <MdSpaceDashboard className="text-neutral-800 text-5xl dark:text-white" />
                    <h2 className="font-semibold text-3xl text-neutral-800 dark:text-white">
                        EasyKanBan
                    </h2>
                </div>
                {/*<h1 className="text-5xl xl:text-6xl p-5 font-black bg-gradient-to-r from-purple-500 to-cyan-400 inline-block text-transparent bg-clip-text">*/}
                <h1 className="text-5xl xl:text-6xl p-5 font-black text-neutral-900 dark:text-white">
                    The easiest and simpliest KanBan-Board ever to organize your
                    amazing projects!
                </h1>
            </div>
            {!userId && (
                <div className="flex gap-10">
                    <Link
                        href={"/sign-in"}
                        className="py-5 px-10 shadow-lg rounded-lg font-semibold text-lg bg-neutral-900 text-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={"/sign-up"}
                        className="py-5 px-10 shadow-lg rounded-lg font-semibold text-lg bg-white text-slate-700"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
            {userId && (
                <Link
                    href={"/dashboard"}
                    className="py-5 px-10 shadow-lg rounded-lg font-semibold text-lg bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white transition ease-out"
                >
                    Go and Explore
                </Link>
            )}
        </main>
    );
}
