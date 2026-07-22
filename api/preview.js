// Vercel serverless function: finds a free 30-second playable preview for a
// track using the iTunes Search API (no key, no auth). Runs server-side so
// there are no CORS headaches. Returns { found, previewUrl, artworkUrl, ... }.

export default async function handler(req, res) {
  const title = (req.query.title ?? "").toString();
  const artist = (req.query.artist ?? "").toString();
  const term = `${title} ${artist}`.trim();

  // Previews are stable — cache hard at the edge.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=86400",
  );

  if (!term) return res.status(200).json({ found: false });

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      term,
    )}&entity=song&limit=5`;
    const r = await fetch(url);
    if (!r.ok) return res.status(200).json({ found: false });

    const data = await r.json();
    const hit = (data.results ?? []).find((x) => x.previewUrl);
    if (!hit) return res.status(200).json({ found: false });

    return res.status(200).json({
      found: true,
      previewUrl: hit.previewUrl,
      artworkUrl:
        hit.artworkUrl100?.replace("100x100", "200x200") ??
        hit.artworkUrl100 ??
        null,
      trackName: hit.trackName ?? title,
      artistName: hit.artistName ?? artist,
    });
  } catch {
    return res.status(200).json({ found: false });
  }
}
