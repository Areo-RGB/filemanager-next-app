import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
import { TeamPdfList } from "@/components/team-pdf-list";

export default function SoccerDrillsFavouritesPage() {
    return (
        <>
            <TopRightControls />
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <TeamPdfList
                    team="soccer-drills"
                    title="Soccer Drills"
                    backHref="/pdf"
                    initialPdfs={[]}
                    initialError={null}
                    showFavouritesOnly={true}
                />
            </main>
            <FloatingDockDemo />
        </>
    );
}
