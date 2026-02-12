import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { ModeToggle } from "@/components/mode-toggle";
import { CardImageGrid } from "@/components/card-image-grid";

export default function Page() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <main className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
                <CardImageGrid />
            </main>
            <FloatingDockDemo />
        </>
    );
}