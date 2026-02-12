import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTeamPdfs, isTeamSlug } from "@/lib/team-pdfs";

export async function GET(request: NextRequest) {
    const team = request.nextUrl.searchParams.get("team") || "d-junioren";

    if (!isTeamSlug(team)) {
        return NextResponse.json(
            { error: `Unknown team: ${team}` },
            { status: 400 }
        );
    }

    try {
        const pdfs = await getTeamPdfs(team);
        return NextResponse.json({ pdfs, count: pdfs.length });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal error", details: String(err) },
            { status: 500 }
        );
    }
}
