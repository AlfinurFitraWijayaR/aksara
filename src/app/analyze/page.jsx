"use client";

import AnalyzeHistory from "@/components/Fragments/Analyze/AnalyzeHistory";
import AnalyzeResult from "@/components/Fragments/Analyze/AnalyzeResult";
import { Example } from "@/components/Fragments/Analyze/Example";
import ImageUpload from "@/components/Fragments/Analyze/ImageUpload";
import { Steps } from "@/components/Fragments/Analyze/Steps";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity } from "lucide-react";
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
      if (!response.ok) {
        throw new Error(result.error);
      }
      console.log(result);

      setCurrentResult(result.data);
    } catch (err) {
      setError(err);
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8 py-16 px-8 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Analyze Image Generator
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          Solusi cepat bagi UMKM untuk menghasilkan konten pemasaran digital
          dari satu foto produk. Sistem otomatis kami menyiapkan deskripsi
          marketplace, ide konten, dan caption media sosial yang relevan
          sehingga anda dapat fokus pada pengembangan bisnis.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error.message?.includes("QUOTA_LIMIT")
              ? "LIMIT MODEL HABIS"
              : error.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 md:gap-8">
        <div className="order-1 md:col-start-1 md:row-start-1">
          <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        <div className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 w-full">
          {currentResult ? (
            <div className="w-full max-h-[70vh] md:max-h-[72vh] overflow-auto">
              <AnalyzeResult result={currentResult} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-100">
              <div className="text-center text-gray-400 p-6">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Upload gambar untuk memulai</p>
              </div>
            </div>
          )}
        </div>

        <div className="order-3 md:col-start-1 md:row-start-2">
          <AnalyzeHistory />
        </div>
      </div>

      <Steps />
      <Example />
    </div>
  );
}
