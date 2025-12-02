import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { promptChatbot } from "@/utils/prompt";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});
console.log(google);

export const runtime = "edge";
const generateId = () => Math.random().toString(36).slice(2, 15);
const buildGoogleGenAIPrompt = (messages) => [
  {
    id: generateId(),
    role: "user",
    content: promptChatbot.content,
  },
  ...messages.map((msg) => ({
    id: msg.id || generateId(),
    role: msg.role,
    content: msg.content,
  })),
];

export async function POST(req) {
  const { messages } = await req.json();
  const stream = await streamText({
    model: google("gemini-2.0-flash"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7,
  });
  return stream?.toDataStreamResponse();
}
