import { createClientForServer } from "@/lib/supabase/server";
import { uploadImageToSupabase } from "@/services/analyzeService";
import {
  saveAnalysisToDatabase,
  saveUsersLimitToDatabase,
} from "@/services/authService";
import { analyzeImage, checkDailyLimit } from "@/services/modelService";
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

  const { allowed } = await checkDailyLimit(user.id, "analyze");
  if (!allowed) {
    return NextResponse.json(
      {
        error: `Kamu telah mencapai batas limit, silahkan coba lagi besok jam ${timeNow}`,
      },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const imageBase64 = formData.get("imageBase64");

    if (!file || !imageBase64) {
      return NextResponse.json(
        { error: "File dan image base64 diperlukan" },
        { status: 400 }
      );
    }

    const result = await analyzeImage(file, imageBase64);
    const uploadImage = await uploadImageToSupabase(file);
    if (!uploadImage.success) {
      return NextResponse.json(
        { error: "Gagal mengupload gambar: " + uploadImage.error },
        { status: 500 }
      );
    }

    const saveUsersLimit = await saveUsersLimitToDatabase({
      feature_name: "analyze",
    });
    if (!saveUsersLimit.success) {
      return NextResponse.json(
        {
          error:
            "Gagal menyimpan hasil users limit ke DB: " + saveUsersLimit.error,
        },
        { status: 500 }
      );
    }

    const saveResult = await saveAnalysisToDatabase({
      imageUrl: uploadImage.url,
      imagePath: uploadImage.path,
      analysisResult: result,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    if (!saveResult.success) {
      return NextResponse.json(
        { error: "Gagal menyimpan hasil analisis: " + saveResult.error },
        { status: 500 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    if (
      error.message?.includes("Quota exceeded") ||
      error.message?.includes("quota")
    ) {
      return new Response(JSON.stringify({ error: "QUOTA_LIMIT" }), {
        status: 428,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
