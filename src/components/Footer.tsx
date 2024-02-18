import { FC } from "react";

interface FooterProps {}

export default function Footer({}) {
    return (
        <footer className="p-10 bg-neutral-900 text-white flex flex-col gap-3 justify-center items-center dark:bg-neutral-950 dark:border-neutral-800 border-t">
            <div className="text-lg font-light">Develped by AaronDev</div>
            <div className="font-bold">@ACBerny22</div>
        </footer>
    );
}
