import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
import { CardImageGrid } from "@/components/card-image-grid";

export default function Page() {
    return (
        <>
            <TopRightControls />
            <main className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
                <CardImageGrid />
            </main>
            <FloatingDockDemo />
        </>
    );
}
