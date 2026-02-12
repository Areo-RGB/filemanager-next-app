"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
    HomeIcon,
    SettingsIcon,
    FileTextIcon,
    VideoIcon,
} from "lucide-react";

const dockItems = [
    {
        title: "Home",
        icon: <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/",
    },
    {
        title: "Videos",
        icon: <VideoIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/videos",
    },
    {
        title: "PDF",
        icon: <FileTextIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/pdf",
    },
    {
        title: "Settings",
        icon: <SettingsIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/settings",
    },
];

export function FloatingDockDemo() {
    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <FloatingDock items={dockItems} />
        </div>
    );
}
