import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Chatbot from "@/components/Fragments/Chatbot/page";
import Providers from "@/components/Providers";
import { createClientForServer } from "@/lib/supabase/server";

export const metadata = {
  title: "Asma AI",
  description:
    "Asma adalah platform AI yang membantu Anda untuk menghasilkan konten pemasaran digital dari satu foto produk. Sistem otomatis kami menyiapkan deskripsi marketplace, ide konten, dan caption media sosial yang relevan sehingga anda dapat fokus pada pengembangan bisnis.",
};

export default async function RootLayout({ children }) {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-violet-200 selection:text-violet-900">
          <Providers user={user}>
            <Navbar />
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-400/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
              <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-[100px] mix-blend-multiply" />
              <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-300/20 rounded-full blur-[120px] mix-blend-multiply" />
            </div>
            {children} <Chatbot />
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
