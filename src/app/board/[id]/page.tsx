"use client";

import { FC } from "react";

interface pageProps {
    params: {
        id: string;
    };
}

export default function page({ ...props }: pageProps) {
    return <div>{props.params.id}</div>;
}
