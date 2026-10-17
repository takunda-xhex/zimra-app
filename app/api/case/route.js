const RATE = new Map();
const LIMIT = 10, WINDOW_MS = 60_000;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (RATE.get(ip) || []).filter(t => now - t < WINDOW_MS);
  hits.push(now);
  RATE.set(ip, hits);
  if (RATE.size > 5000) RATE.clear(); // simple memory guard on serverless instance
  return hits.length > LIMIT;
}

function clean(s, max) {
  if (typeof s !== "string") return "";
  return s.slice(0, max).replace(/[<>]/g, "");
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
  }

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request." }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "Bad request." }, { status: 400 });

  const t = {
    taxpayer: clean(body.taxpayer, 120),
    sector: clean(body.sector, 60),
    fdmsVatUSD: Number.isFinite(+body.fdmsVatUSD) ? Math.max(0, Math.min(1e9, +body.fdmsVatUSD)) : 0,
    declaredVatUSD: Number.isFinite(+body.declaredVatUSD) ? Math.max(0, Math.min(1e9, +body.declaredVatUSD)) : 0,
