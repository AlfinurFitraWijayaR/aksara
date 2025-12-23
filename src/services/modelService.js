import { GoogleGenerativeAI } from "@google/generative-ai";
import { promptGenerator } from "@/utils/prompt";
import {
  convertFileToBase64,
  createImageParts,
  extractTextFromResponse,
  parseAnalysisResult,
} from "@/utils/generate";
import { createClientForServer } from "@/lib/supabase/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeImage(file, imageBase64) {
  const base64Image = await convertFileToBase64(file);
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
  const imageParts = createImageParts(base64Image, file.type);

  const result = await model.generateContent([promptGenerator, ...imageParts]);
  const response = await result.response;
  const text = extractTextFromResponse(response);
  return parseAnalysisResult(text);
}

export async function analyzeBusinessHealth(prompt) {
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
  const result = await model.generateContent(prompt);
  const response = await result.response;

  const text = extractTextFromResponse(response);
  return parseAnalysisResult(text);
}

export async function checkDailyLimit(userId, featureName) {
  const supabase = await createClientForServer();
  const startofDay = new Date();
  startofDay.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("daily_usage_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature_name", featureName)
    .gte("created_at", startofDay.toISOString());

  if (error) {
    console.error("Supabase Error:", error);
    return { allowed: false, error: "Gagal mengecek kuota." };
  }

  if (count !== null && count >= process.env.DAILYM) {
    return { allowed: false };
  }

  return { allowed: true };
}

export async function recordUsage(userId, featureName) {
  const supabase = await createClientForServer();
  await supabase.from("daily_usage_logs").insert({
    user_id: userId,
    feature_name: featureName,
  });
}
