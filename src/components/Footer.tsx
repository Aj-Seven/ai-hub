import { Sparkles } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-4 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-1 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold mt-auto">AI Hub</h2>
        </div>
        <p className="text-slate-400 mb-8 max-w-2xl">
          Empowering creators, marketers, and professionals with AI-powered
          content tools.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-white mb-2">Tools</h3>
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
            <h3 className="font-semibold text-white mb-2">AI Providers</h3>
            <p>OpenAI GPT-4</p>
            <p>Anthropic Claude</p>
            <p>Google Gemini</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Support</h3>
            <p>Help</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-4 pt-2 text-sm text-slate-400">
          <p>&copy; 2025 AI Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
