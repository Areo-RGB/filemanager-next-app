"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const staticCards = [
    {
        image: "https://avatar.vercel.sh/game-rules",
        badge: "Official",
        title: "Game Rules & Regulations",
        description:
            "Official rulebook covering match formats, scoring, and player conduct guidelines.",
        action: "View PDF",
    },
    {
        image: "https://avatar.vercel.sh/nutrition-plan",
        badge: "New",
        title: "Nutrition & Recovery",
        description:
            "Science-backed nutrition guide with meal plans and recovery protocols for athletes.",
        action: "View PDF",
    },
];

export default function PdfPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <main className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
                <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* D-Junioren card */}
                    <Card className="relative w-full pt-0">
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                            <div className="absolute inset-0 z-30 bg-black/35" />
                            <img
                                src="/d-junioren-thumb.png"
                                alt="D-Junioren"
                                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                            />
                        </div>
                        <CardHeader>
                            <CardAction>
                                <Badge variant="secondary">Guide</Badge>
                            </CardAction>
                            <CardTitle>D-Junioren</CardTitle>
                            <CardDescription>
                                Trainingsunterlagen und Übungen für die
                                D-Junioren Mannschaft.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex gap-2">
                            <Link
                                href="/pdf/d-junioren"
                                className={buttonVariants({ variant: "default", className: "w-1/2" })}
                            >
                                View Files
                            </Link>
                            <Link
                                href="/pdf/d-junioren/favourites"
                                className={buttonVariants({ variant: "outline", className: "w-1/2" })}
                            >
                                Favourites
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* E-Junioren card */}
                    <Card className="relative w-full pt-0">
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                            <div className="absolute inset-0 z-30 bg-black/35" />
                            <img
                                src="/e-junioren-thumb.png"
                                alt="E-Junioren"
                                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                            />
                        </div>
                        <CardHeader>
                            <CardAction>
                                <Badge variant="secondary">Guide</Badge>
                            </CardAction>
                            <CardTitle>E-Junioren</CardTitle>
                            <CardDescription>
                                Trainingsunterlagen und Übungen für die
                                E-Junioren Mannschaft.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex gap-2">
                            <Link
                                href="/pdf/e-junioren"
                                className={buttonVariants({ variant: "default", className: "w-1/2" })}
                            >
                                View Files
                            </Link>
                            <Link
                                href="/pdf/e-junioren/favourites"
                                className={buttonVariants({ variant: "outline", className: "w-1/2" })}
                            >
                                Favourites
                            </Link>
                        </CardFooter>
                    </Card>

                    {staticCards.map((card) => (
                        <Card key={card.title} className="relative w-full pt-0">
                            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                            <img
                                src={card.image}
                                alt={card.title}
                                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                            />
                            <CardHeader>
                                <CardAction>
                                    <Badge variant="secondary">
                                        {card.badge}
                                    </Badge>
                                </CardAction>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>
                                    {card.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full">
                                    {card.action}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
            <FloatingDockDemo />
        </>
    );
}
