import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { promptChatbot } from "@/utils/prompt";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

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
  try {
    const { messages } = await req.json();
    const stream = await streamText({
      model: google(process.env.GEMINI_MODEL),
      messages: buildGoogleGenAIPrompt(messages),
      temperature: 0.7,
    });

    return stream?.toDataStreamResponse();
  } catch (error) {
    if (
      error.message?.includes("Quota exceeded") ||
      error.message?.includes("quota")
    ) {
      return new Response(JSON.stringify({ error: "QUOTA_LIMIT" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
