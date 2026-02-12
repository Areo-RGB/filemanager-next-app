"use client"

import * as React from "react"
import { Maximize2Icon, Minimize2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"

type WebkitDocument = Document & {
    webkitExitFullscreen?: () => Promise<void> | void
    webkitFullscreenElement?: Element | null
}

type WebkitElement = HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
}

function isDocumentFullscreen(doc: Document): boolean {
    const webkitDoc = doc as WebkitDocument
    return Boolean(doc.fullscreenElement ?? webkitDoc.webkitFullscreenElement)
}

export function FullscreenToggle() {
    const [mounted, setMounted] = React.useState(false)
    const [fullscreen, setFullscreen] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)

        const syncFullscreenState = () => {
            setFullscreen(isDocumentFullscreen(document))
        }

        syncFullscreenState()
        document.addEventListener("fullscreenchange", syncFullscreenState)
        document.addEventListener(
            "webkitfullscreenchange",
            syncFullscreenState as EventListener
        )

        return () => {
            document.removeEventListener("fullscreenchange", syncFullscreenState)
            document.removeEventListener(
                "webkitfullscreenchange",
                syncFullscreenState as EventListener
            )
        }
    }, [])

    const toggleFullscreen = async () => {
        const doc = document as WebkitDocument

        try {
            if (isDocumentFullscreen(document)) {
                if (doc.exitFullscreen) {
                    await doc.exitFullscreen()
                } else if (doc.webkitExitFullscreen) {
                    await doc.webkitExitFullscreen()
                }
                return
            }

            const root = document.documentElement as WebkitElement
            if (root.requestFullscreen) {
                await root.requestFullscreen()
            } else if (root.webkitRequestFullscreen) {
                await root.webkitRequestFullscreen()
            }
        } catch {
            // Ignore fullscreen permission and browser API errors.
        }
    }

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
                <Maximize2Icon className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleFullscreen}
        >
            {fullscreen ? (
                <Minimize2Icon className="h-4 w-4" />
            ) : (
                <Maximize2Icon className="h-4 w-4" />
            )}
            <span className="sr-only">
                {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            </span>
        </Button>
    )
}
