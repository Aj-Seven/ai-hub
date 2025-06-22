import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="mt-4 px-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Your AI Hub for <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Chat & Content Creation
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
            Chat with powerful models like Ollama models, or generate content
            with smart AI tools — all in one place. Emails, blogs, tweets, and
            more made easy.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-3 text-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg cursor-pointer group"
              onClick={() => router.push("/get-started")}
            >
              Get Started
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>

            <span className="text-gray-500 dark:text-gray-400 animate-pulse flex items-center">
              (or)
            </span>

            <Button
              size="lg"
              className="px-6 py-3 text-lg rounded-xl font-bold shadow-lg transition duration-200 hover:scale-105 cursor-pointer group"
              onClick={() => router.push("/chat")}
            >
              Chat with AI
              <MessageCircle className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 group transition-shadow duration-300 ease-in-out hover:shadow-xl">
          <Image
            src="/assets/hero-image.png"
            alt="AI Hub Illustration"
            width={800}
            height={800}
            className="object-contain rounded-xl border transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:translate-x-2"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
