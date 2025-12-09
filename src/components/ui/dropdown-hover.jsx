"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import ProtectedLink from "./protected-link";

export default function HoverDropdownAnimated({
  label = "Tools",
  items = [
    {
      label: "Analyze Image Generator",
      href: `${process.env.NEXT_PUBLIC_SITE_URL}/analyze`,
    },
    {
      label: "Business Health Check",
      href: `${process.env.NEXT_PUBLIC_SITE_URL}/business-health`,
    },
  ],
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, []);

  const handleToggle = () => setOpen((v) => !v);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block group ${className}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium cursor-pointer"
      >
        <span>{label}</span>

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ease-in-out transform
            group-hover:-rotate-180 ${open ? "-rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute -left-20 md:left-0 w-50 rounded-md shadow-lg bg-white border
          transition-all duration-180 ease-out transform origin-top-left
          opacity-0 invisible translate-y-1
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          ${open ? "opacity-100 visible translate-y-0" : ""}
        `}
        role="menu"
        aria-hidden={!open}
      >
        <nav className="py-1" aria-label={label}>
          {items.map((it, idx) => (
            <ProtectedLink key={idx} href={it.href}>
              <p
                // key={idx}
                // href={it.href}
                className="block px-3 py-2 text-sm hover:bg-violet-50 focus:bg-violet-50 focus:outline-none"
                // role="menuitem"
              >
                {it.label}
              </p>
            </ProtectedLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
