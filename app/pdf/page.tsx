import { ModeToggle } from "@/components/mode-toggle";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const pdfCards = [
    {
        image: "https://avatar.vercel.sh/training-manual",
        badge: "Guide",
        title: "Training Manual",
        description:
            "Complete training plan with drills, exercises, and weekly schedules for all levels.",
        action: "View PDF",
    },
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
                    {pdfCards.map((card) => (
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
