export default async function handler(req, res) {
  const { formato, tipo, tema } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ content: "Error: No has configurado la clave GEMINI_API_KEY en Vercel." });
  }

  // CAMBIO CLAVE: Usamos la versión 'v1' (no beta) y el modelo específico 'gemini-1.5-flash-latest'
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{
        text: `Eres un experto en farmacia y redes sociales. Crea un post para Instagram en español. 
        Formato: ${formato}. 
        Tipo: ${tipo}. 
        Tema: ${tema || 'Salud general'}.
        Usa emojis y hashtags.`
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

    // Si Google devuelve un error, lo mostramos para saber qué pasa
    if (data.error) {
      return res.status(500).json({ content: "Error de Google: " + data.error.message });
    }

    const textoGenerado = data.candidates[0].content.parts[0].text;
    res.status(200).json({ content: textoGenerado });

  } catch (error) {
    res.status(500).json({ content: "Error de conexión: " + error.message });
  }
}
