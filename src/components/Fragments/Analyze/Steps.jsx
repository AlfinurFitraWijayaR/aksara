import { motion } from "framer-motion";
import { Copy, ScanLine, UploadCloud } from "lucide-react";
export const Steps = () => {
  const steps = [
    {
      id: 1,
      icon: UploadCloud,
      title: "1. Upload Foto",
      description:
        "Foto produk terbaikmu, pastikan pencahayaan cukup agar detail terlihat jelas.",
    },
    {
      id: 2,
      icon: ScanLine,
      title: "2. AI Menganalisis",
      description:
        "Teknologi kami membedah visual produk, warna, dan konteks secara detail.",
    },
    {
      id: 3,
      icon: Copy,
      title: "3. Salin & Posting",
      description:
        "Dapatkan caption menarik & deskripsi siap pakai dalam hitungan detik.",
    },
  ];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Cara Kerja <span className="text-violet-600">Fitur Ini</span>
          </h2>
          <p className="text-slate-600">
            Ubah gambar menjadi ide usaha hanya dalam 3 langkah mudah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
