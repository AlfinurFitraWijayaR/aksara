import { Activity } from "lucide-react";
import Link from "next/link";
import ProtectedLink from "./ui/protected-link";

export function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-600 rounded-lg shadow-purple-200 shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">AKSARA</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              Platform asisten marketing AI yang dirancang untuk membantu UMKM
              Go Digital.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-violet-600 cursor-pointer">
                <ProtectedLink
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/analyze`}
                >
                  Analyze Image Generator
                </ProtectedLink>
              </li>
              <li className="hover:text-violet-600 cursor-pointer">
                <ProtectedLink
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/business-health`}
                >
                  Business Health Check
                </ProtectedLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-violet-600 cursor-pointer">Privasi</li>
              <li className="hover:text-violet-600 cursor-pointer">
                Syarat & Ketentuan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            ©2025 Aksara. All rights reserved.
          </p>
          <div className="text-xs text-slate-400 flex gap-6">
            <span>Created with ❤️ by Kelompok 1C</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
