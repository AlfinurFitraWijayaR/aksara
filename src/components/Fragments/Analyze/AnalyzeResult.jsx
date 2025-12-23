"use client";

import { Card } from "@/components/ui/card";
import { Typewriter } from "../Animation/Typewriter";
import { useState } from "react";

export default function AnalysisResult({ result }) {
  const [step, setStep] = useState(0);

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
    <Card className="p-4 md:p-6 w-full max-w-full border-t-4 border-t-purple-600">
      <div className="space-y-4 w-full">
        {/* BAGIAN 1: INTRO */}
        <div className="min-h-[24px]">
          <p className="text-sm text-gray-700 leading-relaxed pb-5 break-words">
            <Typewriter text={result.mulai} onComplete={() => setStep(1)} />
          </p>
        </div>

        {/* BAGIAN 2: DESKRIPSI */}
        {step >= 1 && (
          <div className="fade-in w-full">
            <div className="text-lg font-semibold animate-pulse-once">
              Rekomendasi Deskripsi e-Commerce
            </div>
            {/* Tambahkan 'break-words' & 'w-full' */}
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed pb-5 break-words w-full">
              <Typewriter
                text={result.deskripsi}
                onComplete={() => setStep(2)}
              />
            </p>
          </div>
        )}

        {/* BAGIAN 3: CAPTION */}
        {step >= 2 && (
          <div className="w-full">
            <div className="text-lg font-semibold">
              Rekomendasi Caption Sosial Media
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed pb-5 break-words w-full">
              <Typewriter text={result.caption} onComplete={() => setStep(3)} />
            </p>
          </div>
        )}

        {/* BAGIAN 4: IDE KONTEN */}
        {step >= 3 && (
          <div className="w-full">
            <div className="text-lg font-semibold">
              Rekomendasi Ide Konten Sosial Media
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed pb-5 break-words w-full">
              <ul className="ml-4 md:ml-8 list-disc">
                {" "}
                {Array.isArray(result.ideKonten) &&
                result.ideKonten.length > 0 ? (
                  result.ideKonten.map((item, idx) => (
                    <li
                      key={idx}
                      className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                      style={{ animationDelay: `${idx * 200}ms` }}
                    >
                      {item.ide && <b>{item.ide}: </b>}
                      {item.alasan ?? JSON.stringify(item)}
                    </li>
                  ))
                ) : (
                  <li>Tidak ada ide konten.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
