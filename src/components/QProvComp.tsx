"use client";

import { FC } from "react";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { ThemeProvider } from "next-themes";

interface QProvCompProps {}

const queryClient = new QueryClient();

export default function QProvComp({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
