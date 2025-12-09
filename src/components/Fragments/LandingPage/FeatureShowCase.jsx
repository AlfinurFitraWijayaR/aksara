import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Activity,
} from "lucide-react";
import { HealthCheckFeature } from "./HealthCheckFeature";
import { ChatbotFeature } from "./ChatbotFeatures";
import { AnalyzeImageFeature } from "./ImageToTextFeature";

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("analyze-image");

  const tabs = [
    { id: "analyze-image", label: "AI Analyze Image", icon: Sparkles },
    { id: "chatbot", label: "Aksara AI Chat", icon: MessageSquare },
    { id: "health-check", label: "Business Health Check", icon: Activity },
  ];

  return (
    <section
      className=" relative z-10 py-20  w-full flex items-center justify-center overflow-hidden"
      id="features"
    >
      <div className="container relative z-10 px-3 md:px-6 max-w-5xl mx-auto">
        {/* Tab Switcher (Pill Style) */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 backdrop-blur-md rounded-full md:flex-wrap justify-center gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 z-10
                    ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 bg-slate-900 rounded-full shadow-lg"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-violet-300" : "text-slate-500"
                      }`}
                    />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Container (Glass Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          layout
          className="w-full group relative"
        >
          {/* Background Ambience (Blobs) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-300/30 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100 mix-blend brightness-100 contrast-150"></div>
          </div>

          <div className="hidden md:block absolute -top-10 -right-10 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-20"></div>
          <div className="absolute md:block hidden -bottom-10 -left-10 w-24 h-24 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-20"></div>

          {/* Main Card Content */}
          <div className="relative z-10 w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Header Bar inside Card */}
            <div className="relative h-10 border-b border-white/20 bg-white/30 flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>

            <div className="p-4 md:p-8 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full"
                >
                  {activeTab === "analyze-image" && <AnalyzeImageFeature />}
                  {activeTab === "health-check" && <HealthCheckFeature />}
                  {activeTab === "chatbot" && <ChatbotFeature />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
