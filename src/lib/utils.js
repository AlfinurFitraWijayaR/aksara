import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ALLOWED_EXTENSIONS = [".svg", ".jpg", ".jpeg", ".png"];
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = [
  "image/svg+xml",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: "File tidak ditemukan" };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "Ukuran file maksimal 5MB" };
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error:
        "Format file tidak didukung. Hanya .svg, .jpg, .jpeg, .png yang diperbolehkan",
    };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      valid: false,
      error: "Ekstensi file tidak valid",
    };
  }

  return { valid: true, error: null };
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
