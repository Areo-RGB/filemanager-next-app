"use client";

import { useRef, useState, useEffect } from "react";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
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

type VideoFile = {
    label: string;
    url: string;
};

type VideoCourse = {
    title: string;
    description: string;
    badge: string;
    thumbnailUrl: string;
    videos: VideoFile[];
};

const VIDEO_COURSES: VideoCourse[] = [
    {
        title: "Prellwand Training",
        description:
            "Watch the full training sessions and improve your technique step by step.",
        badge: "Popular",
        thumbnailUrl:
            "https://drills.fra1.cdn.digitaloceanspaces.com/videos/prellwand/Timeline_1_00000000.mp4#t=0.1",
        videos: [
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
        ],
    },
    {
        title: "Leiter V2",
        description:
            "Advanced coordination and footwork drills with Leiter V2.",
        badge: "New",
        thumbnailUrl:
            "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/02_Diagonal_Forwards_Backwards.mp4#t=0.1",
        videos: [
            {
                label: "02 Diagonal Forwards Backwards",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/02_Diagonal_Forwards_Backwards.mp4",
            },
            {
                label: "03 Inside Outside Forwards",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/03_Inside_Outside_Forwards.mp4",
            },
            {
                label: "04 Inside Outside Across",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/04_Inside_Outside_Across.mp4",
            },
            {
                label: "05 Crossover Shuffle",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/05_Crossover_Shuffle.mp4",
            },
            {
                label: "06 Behind Foot Inside Outside",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/06_Behind_Foot_Inside_Outside.mp4",
            },
            {
                label: "07 Behind Foot Inside Outside Across",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/07_Behind_Foot_Inside_Outside_Across.mp4",
            },
            {
                label: "08 Advanced Hopscotch",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/08_Advanced_Hopscotch.mp4",
            },
            {
                label: "09 Inside Outside Crossovers",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/09_Inside_Outside_Crossovers.mp4",
            },
            {
                label: "10 Footwork Combo",
                url: "https://drills.fra1.cdn.digitaloceanspaces.com/videos/Leiter2/10_Footwork_Combo.mp4",
            },
        ],
    },
];

type WebkitFullscreenVideoElement = HTMLVideoElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
};

const staticCards = [
    {
        image: "https://avatar.vercel.sh/masterclass",
        badge: "Premium",
        title: "Advanced React patterns",
        description:
            "Deep dive into compound components, render props, and custom hooks.",
        action: "Enroll Now",
    },
];

function VideoCard({ course }: { course: VideoCourse }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
                video.classList.add("hidden");
                video.pause();
                try {
                    const orientation = screen.orientation as any;
                    if (orientation && orientation.unlock) {
                        orientation.unlock();
                    }
                } catch (e) {
                    console.error("Error unlocking orientation:", e);
                }
            }
        };

        let touchStartY = 0;
        let touchStartX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;

            const diffY = touchEndY - touchStartY;
            const diffX = touchEndX - touchStartX;

            // Ensure it's mostly a vertical swipe (down) and longer than 50px
            if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
                const newRate = Math.max(0.1, video.playbackRate - 0.1);
                // Fix floating point precision
                video.playbackRate = Math.round(newRate * 10) / 10;
            }
        };

        video.addEventListener("fullscreenchange", handleFullscreenChange);
        video.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        video.addEventListener("touchstart", handleTouchStart);
        video.addEventListener("touchend", handleTouchEnd);

        return () => {
            video.removeEventListener("fullscreenchange", handleFullscreenChange);
            video.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            video.removeEventListener("touchstart", handleTouchStart);
            video.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    const handlePlayVideo = (url: string) => {
        const video = videoRef.current;
        if (!video) return;

        video.classList.remove("hidden");
        video.src = url;
        video.muted = true;
        video.playbackRate = 1.0;
        video.currentTime = 0;
        void video.play();

        const enterFullscreenAndLock = () => {
            const lockLandscape = () => {
                if (video.videoWidth > video.videoHeight) {
                    try {
                        const orientation = screen.orientation as any;
                        if (orientation && orientation.lock) {
                            void orientation.lock("landscape");
                        }
                    } catch (e) {
                        console.error("Error locking orientation:", e);
                    }
                }
            };

            if (video.requestFullscreen) {
                video.requestFullscreen().then(() => {
                    lockLandscape();
                }).catch((err) => {
                    console.error("Error attempting to enable fullscreen:", err);
                    video.classList.add("hidden");
                });
            } else {
                const videoWithWebkit = video as WebkitFullscreenVideoElement;
                if (videoWithWebkit.webkitRequestFullscreen) {
                    void videoWithWebkit.webkitRequestFullscreen();
                    lockLandscape();
                }
            }
        };

        if (video.readyState >= 1) {
            enterFullscreenAndLock();
        } else {
            const onLoadedMetadata = () => {
                enterFullscreenAndLock();
                video.removeEventListener("loadedmetadata", onLoadedMetadata);
            };
            video.addEventListener("loadedmetadata", onLoadedMetadata);
        }
    };

    return (
        <Card className="relative flex h-full w-full flex-col pt-0">
            {/* Hidden fullscreen player */}
            <video ref={videoRef} controls playsInline className="hidden" />

            {/* Thumbnail preview */}
            <div className="relative w-full shrink-0 overflow-hidden rounded-t-xl pb-[56.25%]">
                <div className="absolute inset-0 z-30 bg-black/25" />
                <video
                    src={course.thumbnailUrl}
                    muted
                    preload="metadata"
                    playsInline
                    className="absolute inset-0 z-20 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <PlayIcon className="h-6 w-6 fill-white text-white" />
                    </div>
                </div>
            </div>

            <CardHeader className="flex-1">
                <CardAction>
                    <Badge variant="secondary">{course.badge}</Badge>
                </CardAction>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>

            <CardFooter className="mt-auto flex-col items-center gap-2">
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
                    <CollapsibleContent className="mt-2 flex max-h-60 flex-col gap-1.5 overflow-y-auto pr-1">
                        {course.videos.map((video, idx) => (
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
            <TopRightControls />
            <main className="flex min-h-screen items-start justify-center px-4 pb-16 pt-24">
                <div className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {VIDEO_COURSES.map((course) => (
                        <VideoCard key={course.title} course={course} />
                    ))}
                    {staticCards.map((card) => (
                        <Card key={card.title} className="relative flex h-full w-full flex-col pt-0">
                            <div className="absolute inset-0 z-30 shrink-0 pb-[56.25%] rounded-t-xl bg-black/35" />
                            <img
                                src={card.image}
                                alt={card.title}
                                className="relative z-20 shrink-0 pb-[56.25%] w-full rounded-t-xl object-cover grayscale brightness-60 dark:brightness-40"
                                style={{ position: "absolute", height: "100%", paddingBottom: 0 }}
                            />
                            {/* Adding a placeholder to constrain layout appropriately */}
                            <div className="relative w-full shrink-0 pb-[56.25%]" />
                            <CardHeader className="flex-1">
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
                            <CardFooter className="mt-auto">
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
