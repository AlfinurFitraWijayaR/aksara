import { ArrowRight, Copy, Sparkles, Upload, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GlassCard() {
  return (
    <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-violet-500/10 p-6 overflow-hidden">
      {/* Header of Mock App */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="sara.png" alt="sara" />
          </Avatar>
          <div>
            <h3 className="font-bold text-slate-800">Sara</h3>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="space-y-4 mb-6">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-slate-800 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[85%] shadow-lg">
            Halo sara, di Aksara bisa apa saja?
          </div>
        </div>

        {/* AI Generating Indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
          <Sparkles size={12} className="animate-spin text-violet-500" />
          Aksara sedang menulis...
        </div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-start"
        >
          <div className="bg-white/70 border border-white/50 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[95%] shadow-sm">
            <p className="font-semibold text-violet-700 mb-1">
              ✨ Ide Caption:
            </p>
            <p className="mb-2">
              `Senin berat? Tenang, ada yang manis tapi gak janji manis doang.
              🤪`
            </p>
            <p className="mb-2">
              Kenalin, <span className="font-bold">Kopi Gula Aren</span> dari
              Kami! Perpaduan espresso nendang + gula aren asli yang creamy
              banget. Mood booster paling valid buat nemenin deadline kamu.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              #KopiKekinian #MoodBooster #GulaAren #NgopiYuk
            </p>

            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-1 text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded hover:bg-violet-100 transition">
                <Copy size={12} /> Salin
              </button>
              <button className="flex items-center gap-1 text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded hover:bg-slate-100 transition">
                <Wand2 size={12} /> Buat Ulang
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input Area Mock */}
      <div className="bg-white/50 rounded-xl p-2 flex items-center gap-2 border border-white/40">
        <div className="w-8 h-8 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-400">
          <Upload size={16} />
        </div>
        <div className="flex-1 h-2 bg-slate-200/50 rounded-full w-full"></div>
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-500/30">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
