"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TeamPdfList } from "@/components/team-pdf-list";

export default function DJuniorenPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <TeamPdfList
                    team="d-junioren"
                    title="D-Junioren"
                    backHref="/pdf"
                />
            </main>
            <FloatingDockDemo />
        </>
    );
}
