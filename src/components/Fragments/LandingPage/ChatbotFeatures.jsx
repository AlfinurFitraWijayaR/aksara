import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatUI } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";

export const ChatbotFeature = () => {
  const { openChat } = useChatUI();
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-2">
      {/* Chat Interface Container */}
      <div className="flex-1 flex flex-col bg-slate-50/50 rounded-xl border border-white/40 overflow-hidden relative">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border-b border-slate-100 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="sara.png" alt="sara" />
              </Avatar>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Sara</h4>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto relative">
          {/* AI Response Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-start w-70"
          >
            <div className="bg-white p-2 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm w-full max-w-[95%]">
              <p className="text-sm text-slate-700 leading-relaxed">
                Halo, saya Sara. Ada yang bisa dibantu?
              </p>
            </div>
          </motion.div>
          {/* User Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-end"
          >
            <div className="bg-slate-800 text-white p-2 rounded-2xl rounded-tr-none max-w-[85%] shadow-md">
              <p className="text-sm leading-relaxed">Mau tanya tentang....</p>
            </div>
          </motion.div>

          {/* Typing Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-xs text-slate-400 pl-2"
          >
            <Sparkles className="w-3 h-3 text-violet-500 animate-pulse" />
            <span>Sara sedang menulis...</span>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100">
          <div className="relative flex items-center bg-slate-50 rounded-lg border border-slate-200 px-2">
            <input
              disabled
              type="text"
              placeholder="Tulis pesan anda..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-2 text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <Button
              size="icon"
              className="bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        onClick={openChat}
        className="mt-10 w-2/3 mx-auto cursor-pointer bg-slate-900 h-10 rounded-md transition-colors flex items-center justify-center group shadow-md"
      >
        Coba Sekarang
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};
