// app/api/business-health/route.js
import { analyzeBusinessHealth } from "@/services/modelService";
import { promptBusinessHealth } from "@/utils/prompt";
import { saveUsersLimitToDatabase } from "@/services/authService";
import { checkDailyLimit } from "@/services/modelService";
import { timeNow } from "@/utils/generate";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { allowed } = await checkDailyLimit(user.id, "business-health");
  if (!allowed) {
    return NextResponse.json(
      {
        error: `Kamu telah mencapai batas limit, silahkan coba lagi besok jam ${timeNow}`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const saveUsersLimit = await saveUsersLimitToDatabase({
      feature_name: "business-health",
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

    const required = [
      "kategori",
      "omzet",
      "hpp",
      "operasional",
      "hutang",
      "kas",
      "catatan",
    ];
    for (const k of required) {
      if (!(k in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${k}` },
          { status: 400 }
        );
      }
    }

    const prompt = promptBusinessHealth(body);
    const result = await analyzeBusinessHealth(prompt);

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
