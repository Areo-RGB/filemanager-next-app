import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center px-4">
            <h2 className="text-4xl font-extrabold tracking-tight">404</h2>
            <p className="text-xl font-semibold">Page Not Found</p>
            <p className="text-muted-foreground">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/">
                <Button variant="default" className="mt-4">Return Home</Button>
            </Link>
        </div>
    );
}
