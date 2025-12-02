"use server";
import { redirect } from "next/navigation";
import { createClientForServer } from "@/lib/supabase/server";

export const signIn = async () => {
  const supabase = await createClientForServer();
  const authCallbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: authCallbackUrl },
  });

  if (error) {
    console.log(error);
  }
  redirect(data.url);
};

export const signOut = async () => {
  const supabase = await createClientForServer();
  await supabase.auth.signOut();
};

export const saveAnalysisToDatabase = async (analysisData) => {
  try {
    const supabase = await createClientForServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("image_analyses")
      .insert([
        {
          user_id: user.id,
          image_url: analysisData.imageUrl,
          image_path: analysisData.imagePath,
          analysis_result: analysisData.analysisResult,
          file_name: analysisData.fileName,
          file_size: analysisData.fileSize,
          file_type: analysisData.fileType,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return {
      success: true,
      data: data[0],
    };
  } catch (error) {
    console.error("Error saving analysis:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getAnalysisHistory = async (limit = 10) => {
  try {
    const supabase = await createClientForServer();
    const { data, error } = await supabase
      .from("image_analyses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    console.log(data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    return {
      success: false,
      error: error.message,
    };
  }
  // const res = await fetch(`/api/analysis?limit=${limit}`, {
  //   cache: "no-store",
  // });
  // return res.json();
};
