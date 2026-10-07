// Vercel serverless function: returns the owner's GitHub contribution calendar
// for the last year.
//
// GitHub has no unauthenticated API for the calendar, so this parses the same
// public HTML fragment that github.com renders on profile pages. No token needed.

const USERNAME = "PurpleDNA";
const CALENDAR_URL = `https://github.com/users/${USERNAME}/contributions`;

export default async function handler(_req, res) {
  // The calendar only changes as commits land; cache for an hour at the edge.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );

  try {
    const page = await fetch(CALENDAR_URL);
    if (!page.ok) throw new Error(`calendar request failed: ${page.status}`);
    const html = await page.text();

    // Each day cell carries its date and intensity level (0-4); the exact
    // count lives in a separate <tool-tip for="<cell id>"> element.
    const counts = new Map();
    for (const m of html.matchAll(
      /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
    )) {
      const n = m[2].match(/^(\d+)/);
      counts.set(m[1], n ? Number(n[1]) : 0);
    }

    const days = [];
    for (const m of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
      const tag = m[0];
      const date = tag.match(/data-date="([^"]+)"/)?.[1];
      const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
      const id = tag.match(/\bid="([^"]+)"/)?.[1];
      if (!date) continue;
      days.push({ date, level, count: counts.get(id) ?? 0 });
    }

    // Cells are emitted row-by-row (weekday), so sort chronologically.
    days.sort((a, b) => a.date.localeCompare(b.date));
    const total = days.reduce((sum, d) => sum + d.count, 0);

    return res.status(200).json({ username: USERNAME, total, days });
  } catch (err) {
    // The section hides itself when there's no data.
    return res.status(200).json({ username: USERNAME, total: 0, days: [] });
  }
}
