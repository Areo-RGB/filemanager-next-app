import "server-only";

import { cache } from "react";
import type { PdfItem } from "@/lib/d-junioren-data";

const BUCKET_URL = "https://drills.fra1.digitaloceanspaces.com";
const CDN_URL = "https://drills.fra1.cdn.digitaloceanspaces.com";

const TEAM_PREFIXES = {
    "d-junioren": "Junioren Training/D-Junioren/",
    "e-junioren": "Junioren Training/E-Junioren/",
    "soccer-drills": "Junioren Training/SoccerXpert_U10-U12_Drills4/",
} as const;

export type TeamSlug = keyof typeof TEAM_PREFIXES;

export function isTeamSlug(team: string): team is TeamSlug {
    return Object.prototype.hasOwnProperty.call(TEAM_PREFIXES, team);
}

export const getTeamPdfs = cache(async (team: TeamSlug): Promise<PdfItem[]> => {
    const prefix = TEAM_PREFIXES[team];
    const response = await fetch(
        `${BUCKET_URL}/?prefix=${encodeURIComponent(prefix)}&delimiter=/`,
        { next: { revalidate: 300 } }
    );

    if (!response.ok) {
        throw new Error(`Bucket request failed with status ${response.status}`);
    }

    const xml = await response.text();
    const keys: string[] = [];
    const keyRegex = /<Key>(.*?)<\/Key>/g;
    let match: RegExpExecArray | null;

    while ((match = keyRegex.exec(xml)) !== null) {
        keys.push(match[1]);
    }

    return keys
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
});
