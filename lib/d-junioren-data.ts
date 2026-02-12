export interface PdfItem {
    title: string;
    url: string;
    filename: string;
}

const SCHEMA_VERSION = 1;

interface FavouritesSchema {
    version: number;
    items: PdfItem[];
}

/**
 * Get the localStorage key for a team's favourites.
 */
function favKey(team: string): string {
    return `${team}-favourites`;
}

/**
 * Read and validate the stored favourites for a team.
 * Discards data if the schema version doesn't match.
 */
function readStore(team: string): PdfItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(favKey(team));
        if (!raw) return [];

        const parsed = JSON.parse(raw);

        // Migrate from old format (bare array) or mismatched version
        if (Array.isArray(parsed)) {
            // Legacy format — migrate in place
            const migrated: FavouritesSchema = {
                version: SCHEMA_VERSION,
                items: parsed,
            };
            localStorage.setItem(favKey(team), JSON.stringify(migrated));
            return migrated.items;
        }

        if (parsed.version !== SCHEMA_VERSION) {
            // Schema changed — discard stale data
            localStorage.removeItem(favKey(team));
            return [];
        }

        return parsed.items ?? [];
    } catch {
        return [];
    }
}

/**
 * Write favourites back to localStorage with schema version.
 */
function writeStore(team: string, items: PdfItem[]): void {
    const data: FavouritesSchema = { version: SCHEMA_VERSION, items };
    localStorage.setItem(favKey(team), JSON.stringify(data));
}

/**
 * Get all cached favourite PDFs for a team.
 */
export function getCachedFavourites(team: string): PdfItem[] {
    return readStore(team);
}

/**
 * Get the set of favourited URLs for a team (for quick lookup).
 */
export function getFavouriteUrls(team: string): string[] {
    return readStore(team).map((p) => p.url);
}

/**
 * Toggle a PDF in/out of favourites. Stores full metadata so the
 * favourites page can render without an API call.
 */
export function toggleFavourite(team: string, pdf: PdfItem): PdfItem[] {
    const current = readStore(team);
    const exists = current.some((p) => p.url === pdf.url);
    const updated = exists
        ? current.filter((p) => p.url !== pdf.url)
        : [...current, pdf];
    writeStore(team, updated);
    return updated;
}
