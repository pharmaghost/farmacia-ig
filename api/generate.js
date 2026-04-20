export default async function handler(req, res) {
  const { formato, tipo, tema } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ content: "Error: No hay API Key en Vercel" });
  }

  // Usamos una llamada directa por URL para que no falle la librería
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{
        text: `Actúa como un farmacéutico experto en redes sociales. Genera un post de Instagram en español. 
        Formato: ${formato}. Tipo: ${tipo}. Tema: ${tema || 'Salud general'}. Incluye emojis y hashtags.`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const textoGenerado = data.candidates[0].content.parts[0].text;
    res.status(200).json({ content: textoGenerado });

  } catch (error) {
    res.status(500).json({ content: "Error técnico: " + error.message });
  }
}
