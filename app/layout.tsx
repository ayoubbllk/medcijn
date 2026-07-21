import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingEmergency } from "@/components/floating-emergency";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CardioConseils — Comprendre et prendre soin de votre cœur",
  description:
    "Blog éditorial d'un cabinet de cardiologie : sensibilisation, prévention, astuces santé cœur et explications des explorations médicales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(poppins.variable, plusJakartaSans.variable)}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <FloatingEmergency />
      </body>
    </html>
  );
}
