"use client";

import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
import { TeamFavouritesList } from "@/components/team-favourites-list";

export default function DJuniorenFavouritesPage() {
    return (
        <>
            <TopRightControls />
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <TeamFavouritesList
                    team="d-junioren"
                    title="D-Junioren – Favourites"
                    backHref="/pdf/d-junioren"
                />
            </main>
            <FloatingDockDemo />
        </>
    );
}
