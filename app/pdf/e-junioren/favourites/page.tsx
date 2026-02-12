"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { FloatingDockDemo } from "@/components/floating-dock-demo";
import { TeamFavouritesList } from "@/components/team-favourites-list";

export default function EJuniorenFavouritesPage() {
    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ModeToggle />
            </div>
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
