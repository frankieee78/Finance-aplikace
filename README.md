# 💰 Osobní finance — Vercel Deployment

Mobilní aplikace pro správu osobních financí s AI poradcem (Google Gemini).

## 🚀 Nasazení na Vercel (krok za krokem)

### 1. Získejte Gemini API klíč (ZDARMA)

1. Jděte na [aistudio.google.com](https://aistudio.google.com)
2. Přihlaste se Google účtem
3. Klikněte **Get API key** → **Create API key**
4. Zkopírujte klíč (začíná `AIza...`)

**Bezplatný tier:** 15 požadavků/minutu, 1 500/den — pro osobní použití zcela dostačující!

---

### 2. Nahrajte projekt na GitHub

1. Otevřete [github.com](https://github.com) → **New repository**
2. Název: `osobni-finance`
3. Nahrajte tyto soubory:
   - `index.html`
   - `vercel.json`
   - `api/chat.js`

```
osobni-finance/
├── index.html          ← hlavní aplikace
├── vercel.json         ← konfigurace Vercel
└── api/
    └── chat.js         ← AI serverless funkce (Gemini)
```

### 3. Napojte na Vercel

1. Otevřete [vercel.com](https://vercel.com) → **Add New Project**
2. Importujte repozitář `osobni-finance`
3. Framework: **Other**
4. Klikněte **Deploy**

### 4. Přidejte API klíč

1. Vercel dashboard → váš projekt → **Settings**
2. Vlevo: **Environment Variables**
3. Přidejte:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** váš klíč z Google AI Studio
4. **Save** → pak **Redeploy**

### 5. Přidejte na plochu telefonu

1. Otevřete vaši Vercel URL v Chrome (např. `osobni-finance.vercel.app`)
2. Chrome menu **(⋮)** → **Přidat na plochu**
3. Hotovo! Plné AI na telefonu zdarma 🎉

---

## 💰 Cena

| Tier | Limity | Cena |
|---|---|---|
| **Free** | 15 req/min, 1 500/den | **Zdarma** |
| Pay-as-you-go | Neomezeno | ~$0.10/1M tokenů |

Pro osobní použití je **bezplatný tier více než dostačující**.

---

## 🛠️ Jak to funguje

```
Telefon → Vercel (index.html)
         → /api/chat (serverless)
              → Google Gemini API
              → gemini-2.0-flash
         ← odpověď v češtině
```

---

## 📱 Funkce aplikace

- **Přehled** — transakce, zůstatek, příjmy/výdaje
- **Výdaje** — přehled a správa transakcí
- **Rozpočet** — kategorie s měsíčními limity
- **Portfolio** — investice, alokace, alerty
- **Cíle spoření** — milníky, přidávání cílů
- **Učení** — 5 kurzů s kvízy, knihy, příručky, AI poradce (Gemini)
