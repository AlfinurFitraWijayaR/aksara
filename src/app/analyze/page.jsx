"use client";

import AnalyzeHistory from "@/components/Fragments/Analyze/AnalyzeHistory";
import AnalyzeResult from "@/components/Fragments/Analyze/AnalyzeResult";
import ImageUpload from "@/components/Fragments/Analyze/ImageUpload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file, imageBase64) => {
    setIsAnalyzing(true);
    setError(null);
    setCurrentResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imageBase64", imageBase64);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result.data);

      if (!response.ok) {
        throw new Error(result.error || "Gagal menganalisis gambar");
      }

      setCurrentResult(result.data);
    } catch (err) {
      setError(err.message);
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Generator Konten & Copywriting Otomatis
            </h1>
          </div>
          <p className="text-gray-600">
            Dapatkan kebutuhan marketing Anda hanya dari satu gambar menggunakan
            model dari Gemini. Fitur ini dirancang khusus untuk membantu UMKM
            mempercepat proses pembuatan konten digital. Cukup dengan mengunggah
            foto produk yang jelas, algoritma kami akan menghasilkan output
            berupa: Deskripsi produk yang SEO-friendly untuk marketplace,
            Rekomendasi ide konten harian, dan Ide Caption media sosial yang
            engaging. Mulailah berkreasi tanpa batas hari ini.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            <AnalyzeHistory />
          </div>
          <div>
            {currentResult ? (
              <AnalyzeResult result={currentResult} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload gambar untuk memulai analisis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
