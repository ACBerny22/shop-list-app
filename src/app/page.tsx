import { auth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
    const { userId } = auth();
    console.log(userId);
    return (
        <main>
            <div>Home Page</div>
        </main>
    );
}
