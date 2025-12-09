export const validateRequest = (formData) => {
  const file = formData.get("file");
  const imageBase64 = formData.get("imageBase64");

  if (!file || !imageBase64) {
    return {
      isValid: false,
      error: "File dan image base64 diperlukan",
    };
  }

  return {
    isValid: true,
    data: { file, imageBase64 },
  };
};

export async function convertFileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}

export function createImageParts(base64Image, mimeType) {
  return [
    {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    },
  ];
}

export function extractTextFromResponse(response) {
  return typeof response.text === "function"
    ? response.text()
    : String(response);
}

export function parseAnalysisResult(text) {
  let parsedJson = null;
  if (text && typeof text === "string") {
    const match = text.match(/```json([\s\S]*?)```/i);
    if (!match) return null;
    try {
      const jsonString = match[1].trim();
      parsedJson = JSON.parse(jsonString);
    } catch (err) {
      parsedJson = null;
    }
  }
  if (parsedJson) {
    return {
      success: true,
      message: "Analisis Berhasil (JSON parsed)",
      data: parsedJson,
      raw_text: text,
    };
  }

  return {
    success: true,
    message: "Analisis Berhasil",
    data: text,
  };
}

export const timeNow = new Date().toLocaleString("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
