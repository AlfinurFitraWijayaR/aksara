"use client";
import React, { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessResult from "@/components/Fragments/Business/BusinessResult";
import { Steps } from "@/components/Fragments/Business/Steps";
import BusinessForm from "@/components/Fragments/Business/BusinessForm";

export default function BusinessHealth() {
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    kategori: "kuliner",
    omzet: "",
    hpp: "",
    operasional: "",
    hutang: "",
    kas: "lancar",
    catatan: "rapi",
  });

  const analyzeBusiness = async () => {
    setIsCalculating(true);
    setResult(null);

    try {
      const response = await fetch("/api/business-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }

      setResult(result.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menganalisis data. Silakan coba lagi.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-16 px-8 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Business Health Check - Cek Kesehatan Bisnis Anda dalam 1 Menit
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          Dapatkan gambaran cepat tentang kesehatan bisnis Anda dengan analisis
          berbasis AI. Masukkan data utama, dan sistem akan menghasilkan insight
          serta rekomendasi yang relevan untuk membantu Anda mengambil keputusan
          lebih tepat.
        </p>
      </div>

      {/* Main */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-t-4 border-t-purple-600 shadow-md">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Input Data Keuangan
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Masukkan rata-rata angka keuangan bisnis Anda bulan ini.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <BusinessForm
                  formData={formData}
                  setFormData={setFormData}
                  isCalculating={isCalculating}
                  onAnalyze={analyzeBusiness}
                />
              </CardContent>
            </Card>
          </div>

          <BusinessResult result={result} />
        </div>
      </div>

      <Steps />
    </div>
  );
}
