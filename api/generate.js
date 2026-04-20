export default async function handler(req, res) {
  const { formato, tipo, tema } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ content: "Error: No hay API Key." });

  // Lista de modelos a probar en orden de compatibilidad
  const modelos = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro"
  ];

  for (const modelName of modelos) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Eres farmacéutico. Crea un ${formato} de tipo ${tipo} sobre ${tema || 'salud'}. Usa emojis.` }] }]
        })
      });

      const data = await response.json();

      // Si este modelo funciona, devolvemos la respuesta y paramos
      if (data.candidates && data.candidates[0]) {
        return res.status(200).json({ content: data.candidates[0].content.parts[0].text });
      }
    } catch (e) {
      console.log(`Fallo con ${modelName}, probando el siguiente...`);
    }
  }

  // Si llegamos aquí es que ninguno funcionó
  res.status(500).json({ content: "Error: Google no reconoce los modelos en tu región. Revisa si aceptaste los términos en Google AI Studio." });
}
