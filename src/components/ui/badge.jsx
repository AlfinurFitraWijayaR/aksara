import * as React from "react";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-slate-900 text-slate-50",
    Sehat: "bg-green-100 text-green-800 border border-green-200",
    Waspada: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    Bahaya: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
