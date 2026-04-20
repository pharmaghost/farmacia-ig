export default async function handler(req, res) {
  const { formato, tipo, tema } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ content: "Error: No hay API Key configurada." });
  }

  // Usamos el modelo 'gemini-pro', que es el más compatible universalmente
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{
        text: `Eres un farmacéutico experto en marketing. Escribe un post de Instagram en español. 
        Formato: ${formato}. 
        Tipo de contenido: ${tipo}. 
        Tema específico: ${tema || 'Salud y bienestar'}.
        Usa emojis y hashtags de farmacia.`
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
      return res.status(500).json({ content: "Error de Google: " + data.error.message });
    }

    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ content: "Google no pudo generar una respuesta. Intenta con otro tema." });
    }

    const textoGenerado = data.candidates[0].content.parts[0].text;
    res.status(200).json({ content: textoGenerado });

  } catch (error) {
    res.status(500).json({ content: "Error de conexión: " + error.message });
  }
}
