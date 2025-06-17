import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Aj7" />
        <title>AI Hub - Content Creation Platform</title>
        <meta
          name="description"
          content="Powerful AI tools for email writing, tweet generation, grammar checking, and more. Create professional content in seconds."
        />
        <meta
          property="og:title"
          content="AI Hub - Content Creation Platform"
        />
        <meta
          property="og:description"
          content="Powerful AI tools for email writing, tweet generation, grammar checking, and more. Create professional content in seconds."
        />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
