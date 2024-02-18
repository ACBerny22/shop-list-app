"use client";
import { ThemeProvider } from "next-themes";

export default function TProvider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
