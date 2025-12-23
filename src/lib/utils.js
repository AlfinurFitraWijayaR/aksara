import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ALLOWED_EXTENSIONS = [".svg", ".jpg", ".jpeg", ".png"];
export const MAX_FILE_SIZE = 1 * 1024 * 1024;
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

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `Ukuran file maksimal 1MB` };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Format file tidak didukung!",
    };
  }

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

export const formatIDR = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};
