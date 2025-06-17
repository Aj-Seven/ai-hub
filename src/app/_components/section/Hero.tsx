import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="w-full h-fit px-3 py-12 flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">
        {/* Left Content */}
        <div className="lg:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
            Supercharge Your <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Content Creation
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl lg:mx-0">
            Discover the AI tools built to help you write better, faster, and
            smarter — from emails to tweets and everything in between.
          </p>

          <div className="mt-6 sm:mt-8 flex lg:justify-start">
            <Button
              size="lg"
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg cursor-pointer group"
              onClick={() => router.push("/get-started")}
            >
              Get Started
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-xl backdrop-blur-md border">
            <Image
              src="/assets/hero-image.png"
              alt="AI"
              className="object-cover w-full h-full"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
