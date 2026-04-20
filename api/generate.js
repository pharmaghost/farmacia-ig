import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Hemos cambiado el nombre a "gemini-1.5-flash" a secas
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { formato, tipo, tema } = req.body;

  try {
    const prompt = `Actúa como un farmacéutico experto en redes sociales. 
    Crea un contenido en español para Instagram. 
    Formato: ${formato}. 
    Tipo: ${tipo}. 
    Tema: ${tema || 'Salud general'}.
    Incluye emojis de farmacia y 5 hashtags.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ content: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'La IA de Google está ocupada, prueba en un momento.' });
  }
}
