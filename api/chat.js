// api/chat.js — Vercel Serverless Function
// Používá Google Gemini API (zdarma tier dostupný)
// Nastavte env proměnnou GEMINI_API_KEY ve Vercel dashboardu

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY není nastavena. Přidejte ji ve Vercel dashboardu → Settings → Environment Variables.'
    });
  }

  try {
    const { messages, system } = req.body;

    // Převod zpráv do Gemini formátu
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: system ? { parts: [{ text: system }] } : undefined,
      contents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    };

    const model = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({
        error: err.error?.message || 'Chyba Gemini API'
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Interní chyba serveru: ' + error.message });
  }
}
