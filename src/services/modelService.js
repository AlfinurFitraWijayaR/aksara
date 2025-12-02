import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt as systemPrompt } from "@/utils/prompt";
import {
  convertFileToBase64,
  createImageParts,
  extractTextFromResponse,
  parseAnalysisResult,
} from "@/utils/generate";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeImage(file, imageBase64) {
  const base64Image = await convertFileToBase64(file);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const imageParts = createImageParts(base64Image, file.type);

  const result = await model.generateContent([systemPrompt, ...imageParts]);
  const response = await result.response;
  const text = extractTextFromResponse(response);

  return parseAnalysisResult(text);
}
