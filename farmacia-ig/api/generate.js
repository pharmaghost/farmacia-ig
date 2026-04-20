import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { formato, tipoContenido, tono, idioma, tema } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Actúa como un experto en redes sociales para una farmacia profesional. 
    Crea contenido con las siguientes características:
    - Formato: ${formato}
    - Tipo: ${tipoContenido}
    - Tono: ${tono}
    - Idioma: ${idioma}
    - Tema: ${tema || 'temas de salud general de farmacia'}
    
    Si es un carrusel, numera las diapositivas. Incluye emojis relevantes y hashtags de salud.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ contenido: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar contenido con Gemini' });
  }
}