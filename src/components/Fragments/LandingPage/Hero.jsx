import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <>
      <motion.h1
        variants={fadeInUp}
        className="text-5xl md:text-6xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up"
      >
        Asma: Asisten Marketing{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Cerdas{" "}
        </span>
        UMKM
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-md md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
      >
        Didukung oleh model AI canggih Gemini, Asma AI membantu UMKM bekerja
        lebih produktif dan efisien. Automasi marketing cerdas dan insight yang
        akurat memberi Anda ruang untuk berkreasi, berinovasi, dan mengembangkan
        strategi bisnis yang lebih efektif.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400"
      >
        <Link href={"#features"}>
          <button className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Lihat Demo <ArrowDown className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in-up animation-delay-600"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>1000+ UMKM Aktif</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>10,000+ Konten Dibuat</span>
        </div>
      </motion.div>
    </>
  );
}
