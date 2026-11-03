const LIMIT = 10;
const WINDOW_MS = 60_000;
const recentRequests = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recentRequests.set(ip, hits);
  if (recentRequests.size > 5000) {
    for (const [key, values] of recentRequests) {
      if (!values.length || now - values[values.length - 1] >= WINDOW_MS) recentRequests.delete(key);
    }
  }
  return hits.length > LIMIT;
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength).replace(/[<>]/g, "");
}

function safeAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? Math.max(0, Math.min(1_000_000_000, amount)) : 0;
}

export async function POST(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "A valid case object is required." }, { status: 400 });
  }

  const taxpayer = cleanText(body.taxpayer, 120);
  const sector = cleanText(body.sector, 60);
  const fdmsVatUSD = safeAmount(body.fdmsVatUSD);
  const declaredVatUSD = safeAmount(body.declaredVatUSD);
  const suppliedGap = Number(body.vatGapPercent);
  const gapPercent = Number.isFinite(suppliedGap)
    ? Math.max(0, Math.min(100, suppliedGap))
    : (fdmsVatUSD > 0 ? Math.max(0, ((fdmsVatUSD - declaredVatUSD) / fdmsVatUSD) * 100) : 0);
  const riskScore = Math.round(Math.max(0, Math.min(100, safeAmount(body.riskScore))));

  if (!taxpayer) {
    return Response.json({ error: "A taxpayer or case label is required." }, { status: 400 });
  }

  const signals = [
    ["Import mismatch", body.importMismatch === true],
    ["HS code issue", body.hsCodeIssue === true],
    ["Linked-firm indicator", body.linkedFirms === true],
    ["VAT-rate indicator", body.wrongVatRate === true],
  ].filter(([, active]) => active).map(([label]) => label);

  if (gapPercent >= 10) signals.unshift("Material difference between fiscal-device and declared VAT totals");
  else if (gapPercent > 0) signals.unshift("Small difference between fiscal-device and declared VAT totals");

  const riskBand = riskScore >= 60 ? "High" : riskScore >= 30 ? "Medium" : "Low";
  const explanation = signals.length
    ? signals.map((signal) => `• ${signal}`).join("\n")
    : "• No additional risk indicators were supplied for this case.";

  const text = [
    `CASE REVIEW SUMMARY: ${taxpayer}`,
    `Sector: ${sector || "Not supplied"}`,
    `Risk score: ${riskScore}/100 (${riskBand})`,
    `Fiscal-device VAT supplied: US$${fdmsVatUSD.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
    `Declared VAT supplied: US$${declaredVatUSD.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
    `Calculated / supplied gap: ${gapPercent.toFixed(1)}%`,
    "",
    "INDICATORS FOR OFFICER REVIEW",
    explanation,
    "",
    "RECOMMENDED NEXT STEP",
    "Verify the underlying source records, reporting period, taxpayer identity and applicable tax rules before deciding whether to open or continue an audit.",
    "",
    "IMPORTANT LIMITATION",
    "This is an automated, rule-based prototype explanation, not a live AI assessment, audit finding or determination of wrongdoing. Risk indicators are leads for trained officers to verify. No enforcement action should be based on this summary alone."
  ].join("\n");

  return Response.json({
    text,
    generatedAt: new Date().toISOString(),
    mode: "prototype-rule-based",
    disclaimer: "Synthetic demonstration data only. Not an official ZIMRA decision."
  });
}
