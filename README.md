# ShopAI – Server Setup

## Wat zit er in dit project?

```
shopai/
├── api/
│   └── claude.js      ← De mini-server die Claude aanroept
├── package.json
├── vercel.json
└── README.md
```

---

## Stap 1 – GitHub repository aanmaken

1. Ga naar https://github.com/new
2. Geef de repo de naam: `shopai`
3. Zet op **Public** (gratis)
4. Klik **Create repository**
5. Klik op **uploading an existing file**
6. Sleep alle bestanden uit deze map naar het upload-scherm
7. Klik **Commit changes**

---

## Stap 2 – Vercel koppelen

1. Ga naar https://vercel.com
2. Klik **Add New Project**
3. Kies je `shopai` GitHub repo
4. Klik **Deploy** (Vercel detecteert alles automatisch)
5. Na het deployen krijg je een URL zoals:
   `https://shopai-xyz.vercel.app`

---

## Stap 3 – API sleutel toevoegen

1. In Vercel → jouw project → **Settings** → **Environment Variables**
2. Vul in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (jouw sleutel van console.anthropic.com)
3. Klik **Save**
4. Ga naar **Deployments** → klik **Redeploy**

---

## Stap 4 – ShopAI app aanpassen

In je `ShopAI.jsx` verander je de API-aanroep:

### Zoek deze functie:
```js
async function callClaude(prompt, max = 1000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
```

### Vervang door:
```js
const API_URL = "https://JOUW-URL.vercel.app/api/claude"; // ← jouw Vercel URL

async function callClaude(prompt, max = 1000) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, max_tokens: max }),
  });
```

Stuur me je Vercel URL en ik pas de ShopAI.jsx direct voor je aan!

---

## Kosten

| Onderdeel | Kosten |
|-----------|--------|
| Vercel hosting | Gratis |
| Anthropic API | ~€0.003 per zoekopdracht |
| 1.000 zoekopdrachten/dag | ~€3/dag |

Bij 3% affiliate commissie op €100 gemiddelde orderwaarde = €3 per verkoop.
Dus je hebt maar 1 verkoop per dag nodig om quitte te spelen.

---

## Testen

Nadat alles draait, test je de API zo in je browser-console:

```js
fetch("https://JOUW-URL.vercel.app/api/claude", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Zeg hallo in het Nederlands" })
}).then(r => r.json()).then(console.log)
```

Als je `content: [{text: "Hallo!"}]` ziet → alles werkt! ✅
