"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";

export default function Providers({ children, user }) {
  return (
    <AuthProvider user={user}>
      <ChatProvider>{children}</ChatProvider>
    </AuthProvider>
  );
}
