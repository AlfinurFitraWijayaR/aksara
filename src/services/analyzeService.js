import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const uploadImageToSupabase = async (file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;
    const filePath = `analysis-images/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || `image/${fileExt}`,
      });
    if (error) throw error;

    const { data, error: publicError } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    if (publicError) {
      console.error("Get public url error:", publicError);
    }

    const publicUrl = data?.publicUrl ?? null;
    return {
      success: true,
      path: filePath,
      url: publicUrl,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteImageFromSupabase = async (filePath) => {
  try {
    const { error } = await supabase.storage.from("images").remove([filePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};
