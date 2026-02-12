"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { ArrowLeftIcon, FileTextIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import {
    type PdfItem,
    getCachedFavourites,
    toggleFavourite,
} from "@/lib/d-junioren-data";

const TEAM = "d-junioren";

export default function DJuniorenFavouritesPage() {
    const [favPdfs, setFavPdfs] = useState<PdfItem[]>([]);

    useEffect(() => {
        setFavPdfs(getCachedFavourites(TEAM));
    }, []);

    const handleRemove = (pdf: PdfItem) => {
        const updated = toggleFavourite(TEAM, pdf);
        setFavPdfs(updated);
    };

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <div className="w-full max-w-2xl">
                    <div className="mb-1 flex items-center gap-2">
                        <Link
                            href="/pdf/d-junioren"
                            className="rounded-full p-1 transition-colors hover:bg-muted"
                            aria-label="Back"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight">
                            D-Junioren – Favourites
                        </h1>
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Deine gespeicherten Trainingsunterlagen
                    </p>

                    {favPdfs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                            <HeartIcon className="mb-3 h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm font-medium text-muted-foreground">
                                Keine Favoriten vorhanden
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground/60">
                                Klicke auf das Herz-Symbol bei einem PDF, um es
                                hier zu speichern.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col overflow-hidden rounded-lg border">
                            {favPdfs.map((pdf, idx) => (
                                <div
                                    key={pdf.url}
                                    className={`flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-accent ${idx < favPdfs.length - 1
                                            ? "border-b"
                                            : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <a
                                            href={pdf.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-w-0 flex-1 items-center gap-2"
                                        >
                                            <FileTextIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                            <span className="truncate text-sm font-medium">
                                                {pdf.title}
                                            </span>
                                        </a>
                                        <button
                                            onClick={() => handleRemove(pdf)}
                                            className="ml-2 shrink-0 rounded-full p-1 transition-colors hover:bg-muted"
                                            aria-label="Remove from favourites"
                                        >
                                            <HeartIcon className="h-4 w-4 fill-red-500 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <FloatingDockDemo />
        </>
    );
}
