import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiModel = (modelName: string = "gemini-1.5-flash") => {
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will use mock data.");
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
};

export const callGemini = async (prompt: string, modelName: string = "gemini-1.5-flash") => {
  const model = getGeminiModel(modelName);
  if (!model) return null;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
