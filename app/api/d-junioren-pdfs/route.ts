import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BUCKET_URL = "https://drills.fra1.digitaloceanspaces.com";
const CDN_URL = "https://drills.fra1.cdn.digitaloceanspaces.com";

const VALID_TEAMS: Record<string, string> = {
    "d-junioren": "Junioren Training/D-Junioren/",
    "e-junioren": "Junioren Training/E-Junioren/",
};

export async function GET(request: NextRequest) {
    const team = request.nextUrl.searchParams.get("team") || "d-junioren";
    const prefix = VALID_TEAMS[team];

    if (!prefix) {
        return NextResponse.json(
            { error: `Unknown team: ${team}` },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${BUCKET_URL}/?prefix=${encodeURIComponent(prefix)}&delimiter=/`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to list bucket" },
                { status: 502 }
            );
        }

        const xml = await res.text();

        const keys: string[] = [];
        const keyRegex = /<Key>(.*?)<\/Key>/g;
        let match;
        while ((match = keyRegex.exec(xml)) !== null) {
            keys.push(match[1]);
        }

        const pdfs = keys
            .filter((key) => key.endsWith(".pdf"))
            .map((key) => {
                const filename = key.replace(prefix, "");
                const title = filename
                    .replace(/\.pdf$/, "")
                    .replace(/_/g, " ");
                const url = `${CDN_URL}/${encodeURIComponent(key).replace(/%2F/g, "/")}`;

                return { title, url, filename };
            })
            .sort((a, b) => a.title.localeCompare(b.title, "de"));

        return NextResponse.json({ pdfs, count: pdfs.length });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal error", details: String(err) },
            { status: 500 }
        );
    }
}
