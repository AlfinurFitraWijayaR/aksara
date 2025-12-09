import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemSolution() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Lelah Mikirin Konten Tiap Hari?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Jangan habiskan waktu berjam-jam hanya untuk satu postingan. Lihat
            bedanya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200 opacity-80">
            <h3 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                ✕
              </span>
              Cara Lama
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-red-400" />
                Stuck berjam-jam cari ide caption.
              </li>
              <li className="flex items-start gap-3 text-slate-500">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-red-400" />
                Bahasa kaku, kurang menarik buat Gen-Z.
              </li>
              <li className="flex items-start gap-3 text-slate-500">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-red-400" />
                Keputusan Manual
              </li>
            </ul>
          </div>

          {/* The Aksara Way */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-violet-100 shadow-xl shadow-violet-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-200/50 to-indigo-200/50 blur-2xl rounded-full -mr-10 -mt-10 transition-all group-hover:bg-violet-300/50"></div>

            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
              <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 size={16} />
              </span>
              Pakai Aksara
            </h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-green-500" />
                Konten jadi dalam 30 detik.
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-green-500" />
                Gaya bahasa profesional, sesuai target pasar.
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <div className="mt-2 min-w-[6px] h-[6px] rounded-full bg-green-500" />
                Keputusan Berbasis Data
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
