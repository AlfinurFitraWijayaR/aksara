"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function AnalysisResult({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <Card className="p-6">
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {result.error}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h2 className="text-lg font-semibold">Hasil Generate</h2>
        </div>

        <div className="">
          <div className="text-lg font-semibold p-4">
            1. Rekomendasi Deskripsi e-Commerce
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {result.deskripsi}
          </p>
          <div className="text-lg font-semibold p-4">
            2. Rekomendasi Caption Sosial Media
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {result.caption}
          </p>
          <div className="text-lg font-semibold p-4">
            3. Rekomendasi Ide Konten Sosial Media
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            <ul className=" ml-6 list-disc [&>li]:mt-2">
              {Array.isArray(result.ideKonten) &&
              result.ideKonten.length > 0 ? (
                result.ideKonten.map((item, idx) => (
                  <li key={idx}>
                    {item.judul && <em>{item.judul}: </em>}
                    {item.deskripsi ?? JSON.stringify(item)}
                  </li>
                ))
              ) : (
                <li>Tidak ada ide konten.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
