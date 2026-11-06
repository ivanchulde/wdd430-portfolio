import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Iván Chulde | Full-Stack Developer",
    template: "%s | Iván Chulde",
  },
  description:
    "Portfolio of Iván Chulde, an Electronics and Communications Engineer and full-stack development student building web applications with Next.js, React, TypeScript, and Node.js.",
  openGraph: {
    title: "Iván Chulde | Full-Stack Developer",
    description:
      "Portfolio of Iván Chulde: school and open source projects built with Next.js, React, TypeScript, and Node.js.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1565c0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
