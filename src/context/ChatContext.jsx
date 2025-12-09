"use client";
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => setIsChatOpen((v) => !v);

  return (
    <ChatContext.Provider
      value={{ isChatOpen, openChat, closeChat, toggleChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatUI = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatUI must be used within ChatProvider");
  }
  return ctx;
};
