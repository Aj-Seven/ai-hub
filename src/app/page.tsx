"use client";

import Hero from "./_components/section/Hero";
import Features from "./_components/section/Feature";
import Faq from "./_components/section/FAQ";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </div>
  );
}
