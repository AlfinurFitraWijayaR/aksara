"use client";
import { useChatUI } from "@/context/ChatContext";
import Link from "next/link";

export default function CTA() {
  const { openChat } = useChatUI();
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden px-6 py-16 md:px-16 text-center">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-50%] left-[20%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[20%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Siap Mengembangkan Usaha?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Bergabung dengan ribuan UMKM Indonesia lainnya. Hemat waktu, hemat
              biaya, omzet meningkat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openChat}
                className="cursor-pointer px-8 py-4 rounded-full border border-slate-600 text-white font-medium hover:bg-slate-800 transition-all"
              >
                Hubungi Ama
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
