import { GoogleGenerativeAI } from "@google/generative-ai";
export default async function (req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const { formato, tipo, tema } = req.body;
  const prompt = `Crea un contenido para Instagram de una farmacia. Formato: ${formato}. Tipo: ${tipo}. Tema: ${tema}. Usa emojis y hashtags.`;
  const result = await model.generateContent(prompt);
  res.status(200).json({ content: result.response.text() });
}
