/**
 * Reads the CMS-managed member photos, team photos and testimonials for this
 * site from the STX backend (admin panel -> Site assets -> Playmakers).
 *
 * Every failure, timeout or non-200 returns `{}` and every section falls back
 * to the content in lib/content.ts, so a dead backend renders the artboard's
 * page rather than a blank one. An empty section behaves the same way — and one
 * uploaded card means exactly one card, never one plus the placeholders.
 */
const SITE = 'playmakers';
const REVALIDATE_SEC = 300;

export interface SiteItem {
  url: string | null;
  alt: string;
  logoUrl: string | null;
  logoAlt: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
}

export interface SiteSections {
  gallery?: SiteItem[];
  team?: SiteItem[];
  testimonials?: SiteItem[];
}

export async function siteContent(): Promise<SiteSections> {
  const base = process.env.BACKEND_URL;
  if (!base) return {};
  try {
    const res = await fetch(`${base}/api/public/site-content?site=${SITE}`, {
      next: { revalidate: REVALIDATE_SEC },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return {};
    const json = (await res.json()) as { sections?: SiteSections };
    return json.sections ?? {};
  } catch {
    return {};
  }
}
