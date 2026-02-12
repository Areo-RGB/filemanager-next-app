"use client";

import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TopRightControls } from "@/components/top-right-controls";
import { TeamFavouritesList } from "@/components/team-favourites-list";

export default function EJuniorenFavouritesPage() {
    return (
        <>
            <TopRightControls />
            <main className="flex min-h-screen justify-center px-4 pt-24 pb-16">
                <TeamFavouritesList
                    team="e-junioren"
                    title="E-Junioren – Favourites"
                    backHref="/pdf/e-junioren"
                />
            </main>
            <FloatingDockDemo />
        </>
    );
}
