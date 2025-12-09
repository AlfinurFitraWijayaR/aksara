"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/services/authService";
import { Activity } from "lucide-react";

export default function LoginForm(z) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signIn();
    } catch (e) {
      console.error(e);
      alert("Gagal login dengan Google. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 cursor-pointer"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle className="w-10 h-10" />
        {loading ? (
          <span className="flex items-center gap-2">
            <Activity className="w-5 h-5 animate-spin" /> Tunggu sebentar....
          </span>
        ) : (
          "Lanjutkan dengan Google"
        )}
      </Button>
      <p className="text-muted-foreground text-xs text-center mt-3">
        Dengan mendaftar, Anda setuju dengan{" "}
        <span className="underline">Ketentuan Layanan</span> dan{" "}
        <span className="underline">Kebijakan Privasi</span>
      </p>
    </>
  );
}
