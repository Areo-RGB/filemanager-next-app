"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowLeftIcon, FileTextIcon, HeartIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import {
    type PdfItem,
    getFavouriteUrls,
    toggleFavourite,
} from "@/lib/d-junioren-data";

interface TeamPdfListProps {
    team: string;
    title: string;
    backHref: string;
}

export function TeamPdfList({ team, title, backHref }: TeamPdfListProps) {
    const [pdfs, setPdfs] = useState<PdfItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favUrls, setFavUrls] = useState<string[]>([]);
    const [flashIdx, setFlashIdx] = useState<number | null>(null);
    const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // O(1) lookups instead of O(n) .includes()
    const favUrlSet = useMemo(() => new Set(favUrls), [favUrls]);

    useEffect(() => {
        setFavUrls(getFavouriteUrls(team));

        fetch(`/api/d-junioren-pdfs?team=${team}`)
            .then((res) => res.json())
            .then((data) => {
                setPdfs(data.pdfs || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(String(err));
                setLoading(false);
            });
    }, [team]);

    // Clean up flash timer on unmount
    useEffect(() => {
        return () => {
            if (flashTimer.current) clearTimeout(flashTimer.current);
        };
    }, []);

    const handleFavourite = (pdf: PdfItem, idx: number) => {
        const updated = toggleFavourite(team, pdf);
        setFavUrls(updated.map((p) => p.url));
        setFlashIdx(idx);

        if (flashTimer.current) clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setFlashIdx(null), 600);
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="mb-1 flex items-center gap-2">
                <Link
                    href={backHref}
                    className="rounded-full p-1 transition-colors hover:bg-muted"
                    aria-label="Back"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">
                    {title}
                </h1>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
                {loading
                    ? "Lade Trainingsunterlagen…"
                    : `${pdfs.length} Trainingsunterlagen und Übungen`}
            </p>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : null}

            {error ? (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Fehler beim Laden: {error}
                </div>
            ) : null}

            {!loading && !error ? (
                <div className="flex flex-col overflow-hidden rounded-lg border">
                    {pdfs.map((pdf, idx) => {
                        const isFav = favUrlSet.has(pdf.url);
                        const isFlashing = flashIdx === idx;

                        return (
                            <div
                                key={pdf.url}
                                className={`flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-accent ${idx < pdfs.length - 1
                                        ? "border-b"
                                        : ""
                                    } ${isFlashing ? "bg-accent" : ""}`}
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
                                        onClick={() =>
                                            handleFavourite(pdf, idx)
                                        }
                                        className="ml-2 shrink-0 rounded-full p-1 transition-colors hover:bg-muted"
                                        aria-label={
                                            isFav
                                                ? "Remove from favourites"
                                                : "Add to favourites"
                                        }
                                    >
                                        <HeartIcon
                                            className={`h-4 w-4 transition-colors ${isFav
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-muted-foreground hover:text-red-400"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
