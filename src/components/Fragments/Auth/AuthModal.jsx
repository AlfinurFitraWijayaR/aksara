"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import LoginForm from "./LoginForm";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, openAuthModal, closeAuthModal, redirectPath } =
    useAuth();

  return (
    <Dialog
      open={isAuthModalOpen}
      onOpenChange={(open) => !open && closeAuthModal()}
    >
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="cursor-pointer no-underline"
          onClick={() => openAuthModal()}
        >
          <span className="text-md">Login</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Masuk</DialogTitle>
          <DialogDescription className="text-gray-500 mb-3">
            Login untuk mendapatkan akses fitur ASMA.
          </DialogDescription>
        </DialogHeader>
        <LoginForm redirectPath={redirectPath} />
      </DialogContent>
    </Dialog>
  );
}
