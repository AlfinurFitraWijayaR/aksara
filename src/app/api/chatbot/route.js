import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { promptChatbot } from "@/utils/prompt";
import { NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const generateId = () => Math.random().toString(36).slice(2, 15);
const buildPrompt = (messages) => [
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
      messages: buildPrompt(messages),
      temperature: 0.8,
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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
