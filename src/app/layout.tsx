import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Hub - Content Creation Platform",
  description:
    "Powerful AI tools for email writing, tweet generation, grammar checking, and more. Create professional content in seconds.",
  keywords:
    "AI writing, email generator, tweet generator, grammar checker, content creation, copywriting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ThemeProvider>
  );
}
