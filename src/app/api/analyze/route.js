import { uploadImageToSupabase } from "@/services/analyzeService";
import { saveAnalysisToDatabase } from "@/services/authService";
import { analyzeImage } from "@/services/modelService";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const imageBase64 = formData.get("imageBase64");

    if (!file || !imageBase64) {
      return {
        isValid: false,
        error: "File dan image base64 diperlukan",
      };
    }

    const result = await analyzeImage(file, imageBase64);
    const uploadImage = await uploadImageToSupabase(file);
    if (!uploadImage.success) {
      return NextResponse.json(
        { error: "Gagal mengupload gambar: " + uploadImage.error },
        { status: 500 }
      );
    }

    const saveResult = await saveAnalysisToDatabase({
      imageUrl: uploadImage.url,
      imagePath: uploadImage.path,
      analysisResult: result.data,
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
    console.error("Terjadi kesalahan di server: ", error);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// export async function GET(req) {
//   try {
//     const url = new URL(req.url);
//     const limit = parseInt(url.searchParams.get("limit") || "5", 10);
//     const { data, error } = await supabaseClient
//       .from("analyses")
//       .select("*")
//       .order("created_at", { ascending: false })
//       .limit(limit);

//     if (error) {
//       console.error("Supabase GET error:", error);
//       return NextResponse.json(
//         { success: false, message: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
