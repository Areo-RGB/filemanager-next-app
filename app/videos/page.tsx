"use client";

import { useRef, useState } from "react";
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlayIcon, ChevronsUpDown } from "lucide-react";

const PRELLWAND_VIDEOS = [
    {
        label: "Prellwand – Take 1",
        url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/prellwand/Timeline_1_00000000.mp4",
    },
    {
        label: "Prellwand – Take 2",
        url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/prellwand/Timeline_1x00000000.mp4",
    },
    {
        label: "Prellwand – Take 3",
        url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/prellwand/Timeline_1xx00000000.mp4",
    },
    {
        label: "Prellwand – Take 4",
        url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/prellwand/Timeline_1xxs00000000.mp4",
    },
];

const THUMBNAIL_VIDEO = PRELLWAND_VIDEOS[0].url;

const staticCards = [
    {
        image: "https://avatar.vercel.sh/livestream",
        badge: "Live",
        title: "Building a design system",
        description:
            "Live coding session on creating reusable components with consistent theming.",
        action: "Join Stream",
    },
    {
        image: "https://avatar.vercel.sh/masterclass",
        badge: "Premium",
        title: "Advanced React patterns",
        description:
            "Deep dive into compound components, render props, and custom hooks.",
        action: "Enroll Now",
    },
];

function VideoCard() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handlePlayVideo = (url: string) => {
        const video = videoRef.current;
        if (!video) return;

        video.src = url;
        video.muted = false;
        video.currentTime = 0;
        video.play();

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        }
    };

    return (
        <Card className="relative w-full pt-0">
            {/* Hidden fullscreen player */}
            <video
                ref={videoRef}
                controls
                playsInline
                className="hidden"
            />

            {/* Thumbnail preview */}
            <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 z-30 bg-black/25" />
                <video
                    src={THUMBNAIL_VIDEO}
                    muted
                    preload="metadata"
                    playsInline
                    className="relative z-20 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <PlayIcon className="h-6 w-6 fill-white text-white" />
                    </div>
                </div>
            </div>

            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Popular</Badge>
                </CardAction>
                <CardTitle>Prellwand Training</CardTitle>
                <CardDescription>
                    Watch the full training sessions and improve your technique
                    step by step.
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex-col items-center gap-2">
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full"
                >
                    <CollapsibleTrigger
                        render={
                            <Button variant="outline" className="w-full">
                                <PlayIcon className="mr-2 h-4 w-4" />
                                {isOpen ? "Hide Videos" : "Watch Now"}
                                <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        }
                    />
                    <CollapsibleContent className="mt-2 flex flex-col gap-1.5">
                        {PRELLWAND_VIDEOS.map((video, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePlayVideo(video.url)}
                                className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <PlayIcon className="h-3.5 w-3.5 shrink-0 opacity-60" />
                                {video.label}
                            </button>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    );
}

export default function VideosPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <main className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
                <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <VideoCard />
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
