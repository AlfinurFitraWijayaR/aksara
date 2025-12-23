"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownCircleIcon, ArrowRight, Sparkles, X } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useChatUI } from "@/context/ChatContext";

export default function Chatbot() {
  const { isChatOpen, toggleChat, closeChat } = useChatUI();
  const [ShowChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef(null);
  const scrollRef = useRef(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chatbot",
      initialMessages: [
        {
          role: "assistant",
          content: "Halo, saya Ama. Ada yang bisa saya bantu hari ini?",
        },
      ],
    });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {ShowChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
          >
            {!isChatOpen && (
              <div className="relative px-4 py-2 bg-white shadow-xl rounded-2xl border text-sm text-gray-800 max-w-[200px] animate-chat-pop">
                Perlu bantuan?
                <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-b border-r rotate-45"></div>
              </div>
            )}
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              variant="outline"
              size="icon"
              className="rounded-full h-14 w-14 shadow-2xl cursor-pointer"
            >
              {!isChatOpen ? (
                <Avatar className="h-full w-full">
                  <AvatarImage src="sara.png" alt="@sara" />
                </Avatar>
              ) : (
                <ArrowDownCircleIcon className="size-10" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-25 right-4 z-20 w-[95%] md:w-[500px]"
          >
            <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-violet-500/10 overflow-hidden">
              <CardHeader className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="sara.png" alt="sara" />
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Ama</CardTitle>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeChat}
                  className=" cursor-pointer"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4 -mt-6">
                <ScrollArea className="h-[300px]">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={` mb-4 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-slate-800 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[85%] shadow-lg"
                            : "bg-white border border-white/50 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[95%] shadow-sm"
                        }`}
                      >
                        <MarkdownRenderer content={message.content} />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
                      <Sparkles
                        size={12}
                        className="animate-spin text-violet-500"
                      />
                      ASMA sedang berpikir...
                    </div>
                  )}
                  {error && (
                    <div className="text-red-600 text-center text-sm">
                      {error.message?.includes("429") ||
                      error.message?.includes("QUOTA_LIMIT")
                        ? "LIMIT MODEL HABIS"
                        : JSON.parse(error.message).error}
                    </div>
                  )}
                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 border-gray-300 focus:ring-2 focus:ring-purple-600"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading}
                    className="size-9 bg-violet-600 hover:bg-violet-600/80 cursor-pointer"
                  >
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
