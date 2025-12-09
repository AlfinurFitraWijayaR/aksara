"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLink({ href, children, className }) {
  const { user, openAuthModal } = useAuth();

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      openAuthModal(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
