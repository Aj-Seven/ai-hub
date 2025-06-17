import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t py-4 px-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-2">
          <div className="rounded-lg">
            <Link href="/" className="flex items-center gap-1">
              <div className="rounded-lg">
                <Image
                  src="/assets/logo-nobg.png"
                  alt="AI Hub Logo"
                  width={42}
                  height={42}
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                AI Hub
              </span>
            </Link>
          </div>
        </div>
        <p className="max-w-2xl mb-2">
          Empowering creators, marketers, and professionals with AI-powered
          content tools.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-extrabold">Tools</h3>
            <p>Email Writer</p>
            <p>Tweet Generator</p>
            <p>Grammar Checker</p>
            <p>Sentence Builder</p>
            <p>Text Summarizer</p>
            <p>Content Rewriter</p>
            <p>Blog Post Generator</p>
            <p>Social Caption Generator</p>
          </div>
          <div>
            <h3 className="font-extrabold">AI Providers</h3>
            <p>OpenAI GPT-4</p>
            <p>Anthropic Claude</p>
            <p>Google Gemini</p>
          </div>

          <div>
            <h3 className="font-extrabold">Support</h3>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="border-t mt-4 pt-2 text-sm">
          <p>&copy; 2025 AI Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
