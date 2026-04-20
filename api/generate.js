import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("No has puesto la API Key en Vercel");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { formato, tipo, tema } = req.body;
    const prompt = `Genera un post de farmacia para Instagram. Formato: ${formato}. Tipo: ${tipo}. Tema: ${tema}. En español.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ content: response.text() });

  } catch (error) {
    // Esto hará que el error aparezca en tu pantalla
    res.status(500).json({ content: "Error técnico: " + error.message });
  }
}
