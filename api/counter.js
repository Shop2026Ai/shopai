// api/counter.js
// Sla op in jsonbin.io — vul JSONBIN_BIN_ID en JSONBIN_API_KEY in als
// environment variables in je Vercel dashboard (Settings → Environment Variables)

const BIN_ID  = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export default async function handler(req, res) {
  // CORS — zowel shop-ai.nl als localhost
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // 1. Haal huidige waarde op
    const getRes = await fetch(`${BIN_URL}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
        "X-Bin-Meta":   "false",
      },
    });
    if (!getRes.ok) throw new Error(`GET failed: ${getRes.status}`);
    const data  = await getRes.json();
    const newCount = (data.count || 0) + 1;

    // 2. Sla nieuwe waarde op
    await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ count: newCount }),
    });

    res.status(200).json({ count: newCount });
  } catch (err) {
    console.error("Counter error:", err);
    res.status(500).json({ error: err.message });
  }
}
