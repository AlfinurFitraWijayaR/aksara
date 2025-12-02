"use server";
import Link from "next/link";
import Image from "next/image";
import { createClientForServer } from "@/lib/supabase/server";
import { LoginUser } from "./Auth/LoginUser";
import AuthModal from "../Modal/AuthModal";

export const Navbar = async () => {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="inset-x-0 top-0 z-50 bg-transparent/50 border-b border-neutral-700">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={25} height={25} />
          </Link>

          <div className="flex items-center">
            {user ? <LoginUser user={user} /> : <AuthModal />}
          </div>
        </div>
      </div>
    </nav>
  );
};
