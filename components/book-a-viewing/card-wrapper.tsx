"use client";

import { Card, CardContent,  CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;

}

export const CardWrapper = ({
    children,
    headerLabel,
}: CardWrapperProps) => {
    return (
        <Card className="min-w-[400px] max-w-[500px] dark:bg-zinc-950/60 bg-white/60  backdrop-blur-xl text-gray-700 dark:text-gray-200 shadow-black/5 dark:shadow-white/5 shadow-md font-sans">
            <CardHeader className=" font-semibold text-xl">
                {headerLabel}
            </CardHeader>
            <CardContent>{children}</CardContent>

        </Card>
    );
};