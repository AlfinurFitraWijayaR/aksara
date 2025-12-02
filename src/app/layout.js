import { Navbar } from "@/components/Fragments/Navbar";
import "./globals.css";
import Footer from "@/components/Fragments/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
