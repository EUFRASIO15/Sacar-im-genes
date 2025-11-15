import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Safely extracts a JSON object from a string.
 * @param text The string that may contain a JSON object.
 * @returns The parsed object or null if no valid JSON is found.
 */
const extractJson = (text: string): { imageUrl: string } | null => {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        return null;
    }
    try {
        return JSON.parse(jsonMatch[0]);
    } catch (e) {
        console.error("Failed to parse JSON from model response:", e);
        return null;
    }
};


/**
 * Fetches the sign language image URL for a given word from DILSE website using Gemini with Google Search.
 * @param word The word to search for.
 * @returns A promise that resolves to the image URL string, or an empty string if not found.
 */
export const fetchSignLanguageImage = async (word: string): Promise<string> => {
  try {
    const prompt = `
      Tu tarea es encontrar la URL directa de la imagen (normalmente un GIF animado) que representa la palabra en lengua de signos española: "${word}".

      Debes buscar esta imagen EXCLUSIVAMENTE en el sitio web del diccionario DILSE: https://fundacioncnse-dilse.org

      Pasos a seguir:
      1. Utiliza tu herramienta de búsqueda para encontrar la página correcta para la palabra "${word}" en "fundacioncnse-dilse.org".
      2. Una vez en la página del resultado, localiza la primera imagen o GIF que ilustra el signo.
      3. Extrae la URL completa y directa de esa imagen.

      Formato de respuesta:
      Responde ÚNICAMENTE con un objeto JSON con la siguiente estructura. No añadas explicaciones, texto introductorio ni markdown.
      {
        "imageUrl": "LA_URL_DIRECTA_DE_LA_IMAGEN.gif"
      }

      Si no encuentras una imagen para la palabra, el valor de "imageUrl" debe ser una cadena vacía "".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const responseText = response.text.trim();
    const result = extractJson(responseText);

    return result?.imageUrl || '';

  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    throw new Error("Failed to get image URL from Gemini.");
  }
};
