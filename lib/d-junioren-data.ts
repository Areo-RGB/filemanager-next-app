export interface PdfItem {
    title: string;
    url: string;
    filename: string;
}

/**
 * Get the localStorage key for a team's favourites.
 */
function favKey(team: string): string {
    return `${team}-favourites`;
}

/**
 * Get all cached favourite PDFs for a team.
 */
export function getCachedFavourites(team: string): PdfItem[] {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(favKey(team)) || "[]");
    } catch {
        return [];
    }
}

/**
 * Get the set of favourited URLs for a team (for quick lookup).
 */
export function getFavouriteUrls(team: string): string[] {
    return getCachedFavourites(team).map((p) => p.url);
}

/**
 * Toggle a PDF in/out of favourites. Stores full metadata so the
 * favourites page can render without an API call.
 */
export function toggleFavourite(team: string, pdf: PdfItem): PdfItem[] {
    const current = getCachedFavourites(team);
    const exists = current.some((p) => p.url === pdf.url);
    const updated = exists
        ? current.filter((p) => p.url !== pdf.url)
        : [...current, pdf];
    localStorage.setItem(favKey(team), JSON.stringify(updated));
    return updated;
}
