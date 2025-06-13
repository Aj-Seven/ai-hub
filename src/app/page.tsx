"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import ApiStatus from "./_components/ApiStatus";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ApiStatus />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-3">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Supercharge Your Content Creation
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI with our comprehensive suite of writing
            tools. From emails to tweets, we've got everything you need to
            create compelling content.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-transform duration-300 rounded-lg"
              onClick={() => {
                router.push("/get-started");
              }}
            >
              Get Started
              <ArrowRight className="h-6 w-6 animate-ping" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 mb-4 px-3 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose AI Hub?
            </h3>
            <p className="text-lg text-slate-600">
              Experience the future of content creation with multiple AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Multiple AI Providers
              </h4>
              <p className="text-slate-600">
                Access OpenAI, Claude, Gemini, Cohere and more...
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Real-time Generation
              </h4>
              <p className="text-slate-600">
                Generate high-quality content in real-time with live API
                integrations
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Easy Integration
              </h4>
              <p className="text-slate-600">
                Seamlessly integrate AI-powered tools into your workflow
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
