import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const cards = [
    {
        image: "https://avatar.vercel.sh/design-systems",
        badge: "Featured",
        title: "Design systems meetup",
        description:
            "A practical talk on component APIs, accessibility, and shipping faster.",
        action: "View Event",
    },
    {
        image: "https://avatar.vercel.sh/ai-engineering",
        badge: "New",
        title: "AI engineering workshop",
        description:
            "Hands-on session covering LLM integration, prompt design, and production deployment.",
        action: "Register Now",
    },
    {
        image: "https://avatar.vercel.sh/open-source",
        badge: "Community",
        title: "Open source contributions",
        description:
            "Learn how to make your first contribution and build with the community.",
        action: "Join Session",
    },
]

export function CardImageGrid() {
    return (
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <Card key={card.title} className="relative w-full pt-0">
                    <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                    <Image
                        src={card.image}
                        alt={card.title}
                        width={800}
                        height={450}
                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                    />
                    <CardHeader>
                        <CardAction>
                            <Badge variant="secondary">{card.badge}</Badge>
                        </CardAction>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="w-full">{card.action}</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
