"use client";
import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { motion, AnimatePresence } from "framer-motion";
// import { useChat } from "@ai-sdk/react";
import LandingPage from "@/components/LandingPage";
import { ArrowDownCircleIcon, MessageCircle, Send, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatIconRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya Sara, asisten virtual Anda. Ada yang bisa saya bantu?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulasi respons bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Terima kasih atas pesan Anda! Saya sedang memproses permintaan Anda.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="h-screen flex items-center justify-center text-center p-4">
      <LandingPage />
      <div className="fixed bottom-10 right-10 z-50">
        <Button
          ref={chatIconRef}
          onClick={toggleChat}
          size="icon"
          className="rounded-full h-16 w-16 shadow-2xl hover:scale-110 transition-transform bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {!isChatOpen ? (
            <MessageCircle className="h-8 w-8" />
          ) : (
            <ArrowDownCircleIcon className="h-8 w-8" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-4 z-50 w-[95%] md:w-[420px] animate-in slide-in-from-bottom-5 duration-300">
          <Card className="border-2 shadow-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 text-white pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarFallback className="bg-purple-800 text-white">
                    SA
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    Chat with Sara
                  </CardTitle>
                  <p className="text-xs text-purple-100">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="rounded-full hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea ref={scrollRef} className="h-[400px] p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-purple-100"
                              : "text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-gray-300 focus:ring-2 focus:ring-purple-600"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* <div className="fixed bottom-10 right-10 z-50">
        <Button
          ref={chatIconRef}
          onClick={toggleChat}
          size="icon"
          className="rounded-full size-14 p-2 shadow-lg cursor-pointer"
        >
          {!isChatOpen ? (
            <MessageCircle className="size-12" />
          ) : (
            <ArrowDownCircleIcon />
          )}
        </Button>
      </div>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[420px]"
          >
            <Card className="border-2xl overflow-hidden">
              <CardHeader className="flex items-center  justify-between bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarFallback className="bg-purple-800 text-white">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Chat with Sara</CardTitle>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="rounded-full size-14 p-2 shadow-lg cursor-pointer"
                >
                  <X className="size-12" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea
                  ref={scrollRef}
                  className="h-[400px] p-4 bg-gray-50"
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-purple-100"
                                : "text-gray-400"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ketik pesan Anda..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border-gray-300 focus:ring-2 focus:ring-purple-600"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence> */}
    </section>
  );
}
