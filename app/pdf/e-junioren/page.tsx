import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
import { TeamPdfList } from "@/components/team-pdf-list";
import { getTeamPdfs } from "@/lib/team-pdfs";

export default async function EJuniorenPage() {
    const { initialPdfs, initialError } = await getTeamPdfs("e-junioren")
        .then((pdfs) => ({ initialPdfs: pdfs, initialError: null }))
        .catch((error) => ({
            initialPdfs: [],
            initialError:
                error instanceof Error ? error.message : "Unknown server error",
        }));

    return (
        <>
            <TopRightControls />
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <TeamPdfList
                    team="e-junioren"
                    title="E-Junioren"
                    backHref="/pdf"
                    initialPdfs={initialPdfs}
                    initialError={initialError}
                />
            </main>
            <FloatingDockDemo />
        </>
    );
}
