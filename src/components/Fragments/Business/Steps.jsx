import { motion } from "framer-motion";
import { CheckCircle, FormInputIcon, ScanLine } from "lucide-react";
export const Steps = () => {
  const steps = [
    {
      id: 1,
      icon: <FormInputIcon size={24} />,
      title: "1. Input Data",
      description:
        "Data keuangan bisnismu, pastikan input benar supaya AI menganalisis lebih enak.",
    },
    {
      id: 2,
      icon: <ScanLine size={24} />,
      title: "2. AI Menganalisis",
      description: "Model membedah data keuangan anda secara detail",
    },
    {
      id: 3,
      icon: <CheckCircle size={24} />,
      title: "3. Dapatkan Laporan & Solusi",
      description:
        "Terima skor kesehatan bisnis, analisis risiko, dan strategi perbaikan dalam hitungan detik.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Cara Kerja <span className="text-violet-600">Fitur Ini</span>
          </h2>
          <p className="text-slate-600">
            Masukan data keuangan usaha anda hanya dalam 1 langkah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
