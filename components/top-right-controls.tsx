import { FullscreenToggle } from "@/components/fullscreen-toggle"
import { ModeToggle } from "@/components/mode-toggle"

export function TopRightControls() {
    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-1">
            <FullscreenToggle />
            <ModeToggle />
        </div>
    )
}
