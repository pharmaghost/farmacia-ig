import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // Forzamos el uso de la versión estable de la API
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Aquí está el truco: usamos el modelo con el nombre técnico exacto
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
    });

    const { formato, tipo, tema } = req.body;
    const prompt = `Actúa como un farmacéutico experto en marketing. 
    Crea un contenido de calidad para Instagram en español. 
    Formato: ${formato}. 
    Tipo: ${tipo}. 
    Tema: ${tema || 'Consejo de salud'}.
    Incluye emojis y hashtags.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ content: response.text() });

  } catch (error) {
    // Si falla, nos dirá exactamente por qué
    res.status(500).json({ content: "Error técnico: " + error.message });
  }
}
