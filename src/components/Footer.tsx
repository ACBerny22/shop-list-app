import { FC } from "react";
import Link from "next/link";

interface FooterProps {}

export default function Footer({}) {
    return (
        <footer className="p-10 flex flex-col gap-3 justify-center items-center bg-white dark:bg-neutral-950 dark:border-neutral-800 dark:text-white border-t">
            <div className="text-lg">Develped by AaronDev</div>
            <Link href={"https://github.com/ACBerny22"} className="font-bold">
                @ACBerny22
            </Link>
            <span className="font-thin">Powered by MyLittleBee</span>
        </footer>
    );
}
