import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { buildPrompt, timeNow } from "@/utils/generate";
import { saveUsersLimitToDatabase } from "@/services/authService";
import { checkDailyLimit } from "@/services/modelService";
import { createClientForServer } from "@/lib/supabase/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req) {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { allowed } = await checkDailyLimit(user.id, "chatbot");
  if (!allowed) {
    return NextResponse.json(
      {
        error: `Kamu telah mencapai batas limit, silahkan coba lagi bulan depan`,
      },
      { status: 429 }
    );
  }

  try {
    const { messages } = await req.json();
    const stream = await streamText({
      model: google(process.env.GEMINI_MODEL),
      messages: buildPrompt(messages),
      temperature: 0.8,
    });

    const saveUsersLimit = await saveUsersLimitToDatabase({
      feature_name: "chatbot",
    });
    if (!saveUsersLimit.success) {
      return NextResponse.json(
        {
          error:
            "Gagal menyimpan hasil limit business health ke DB: " +
            saveUsersLimit.error,
        },
        { status: 500 }
      );
    }
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
