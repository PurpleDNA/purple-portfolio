// Vercel serverless function: returns the owner's current Spotify track.
//
// Holds the Spotify secrets server-side (never shipped to the browser) and
// exposes only sanitized now-playing data. Configure these env vars in the
// Vercel dashboard (Project → Settings → Environment Variables):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN   (one-time OAuth grant for your own account)

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`token request failed: ${res.status}`);
  return res.json();
}

export default async function handler(_req, res) {
  // Cache at the edge for 30s so we never hammer Spotify's rate limits, even
  // with many visitors polling.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=30",
  );

  try {
    const { access_token } = await getAccessToken();

    const now = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 204 = nothing playing; anything >=400 = treat as idle.
    if (now.status === 204 || now.status >= 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = await now.json();
    const item = song?.item;
    if (!song || !item) {
      return res.status(200).json({ isPlaying: false });
    }

    // Tracks expose album.images + artists; podcast episodes expose images + show.
    const albumImageUrl =
      item.album?.images?.[0]?.url ?? item.images?.[0]?.url ?? null;
    const artist = item.artists
      ? item.artists.map((a) => a.name).join(", ")
      : (item.show?.name ?? "");

    return res.status(200).json({
      isPlaying: Boolean(song.is_playing),
      title: item.name ?? "",
      artist,
      album: item.album?.name ?? item.show?.name ?? "",
      albumImageUrl,
      songUrl: item.external_urls?.spotify ?? null,
    });
  } catch (err) {
    // Never surface details; the widget just stays hidden on failure.
    return res.status(200).json({ isPlaying: false });
  }
}
