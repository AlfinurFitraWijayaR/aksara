import { useState } from "react";
import { ChefHat, Shirt, Scissors } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Copy } from "lucide-react";
import Image from "next/image";

export const Example = () => {
  const [activeTab, setActiveTab] = useState("kuliner");

  const categories = [
    { id: "kuliner", label: "Kuliner", icon: <ChefHat size={16} /> },
    { id: "fashion", label: "Fashion", icon: <Shirt size={16} /> },
    { id: "kerajinan", label: "Kerajinan", icon: <Scissors size={16} /> },
  ];

  const examples = {
    kuliner: {
      image: "/kacang.jpg",
      title: "Rekomendasi Deskripsi E-Commerce",
      text: "🔥 [Brand kamu]! Renyahnya bikin nagih. \nDibuat dari kacang pilihan dengan balutan terigu premium yang melimpah. Cocok banget buat nemenin Netflix-an atau sekedar cemilan sore. \n✅ Tanpa pengawet\n✅ Manis pas, gak bikin giung\n\nOrder sekarang sebelum kehabisan! #KeripikPisang #CemilanEnak",
    },
    fashion: {
      image: "/fashion.jpg",
      title: "Rekomendasi Caption Terbaik",
      text: "✨ Matchday look kamu bakal makin keren dengan jersey Persib terbaru 25/26 dari [Brand kamu]. Nyaman dipakai sehari-hari, stylish buat nongkrong, dan makin pede saat nonton bareng! Ayo amankan ukuran kamu hari ini juga. Tersedia size dewasa & anak!",
    },
    kerajinan: {
      image: "/kerajinan.avif",
      title: "Rekomendasi Ide Konten",
      text: "1. Konten ‘Behind The Scenes’ Proses Pembuatan Kerajinan: Buat video singkat yang memperlihatkan detail proses pembuatan produk, mulai dari pemilihan bahan, teknik pengerjaan, hingga finishing. Sorot keahlian tangan (handcrafted skill) dan ketelitian dalam setiap tahap. Konten ini sangat efektif membangun kepercayaan dan menunjukkan bahwa produk Anda bernilai karena dibuat dengan dedikasi dan craftsmanship tinggi.",
    },
  };

  const activeContent = examples[activeTab];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Lihat Kemampuan AI Kami
          </h2>
        </div>

        {/* Custom Tabs List */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-center rounded-lg p-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 ${
                  activeTab === cat.id
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          <Card className="overflow-hidden border-violet-100 shadow-lg">
            <div className="flex flex-col md:flex-row min-h-[300px]">
              {/* Left: Image Placeholder */}
              <div
                className={`w-full md:w-5/12 flex flex-col items-center justify-center p-8 transition-colors duration-500`}
              >
                <Image
                  src={activeContent.image}
                  width={500}
                  height={500}
                  alt="img"
                />
              </div>

              {/* Right: Generated Text */}
              <div className="w-full md:w-7/12 p-6 md:p-8 bg-white flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-violet-600" />
                  <h4 className="font-semibold text-slate-900 text-lg">
                    Hasil Aksara:
                  </h4>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <h5 className="font-bold text-slate-800 mb-2">
                    {activeContent.title}
                  </h5>
                  <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                    {activeContent.text}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
