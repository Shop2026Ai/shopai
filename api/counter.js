// api/counter.js — Upstash Redis teller
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    const r = await fetch(`${url}/incr/cadeauai_visits`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json();
    res.status(200).json({ count: data.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
