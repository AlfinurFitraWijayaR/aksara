"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import LoginForm from "../Fragments/Auth/LoginForm";
import { useState } from "react";

export default function AuthModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          Masuk
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Masuk</DialogTitle>
          <DialogDescription className="text-gray-500 mb-3">
            Masuk untuk mendapatkan akses penuh fitur Aksara.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
