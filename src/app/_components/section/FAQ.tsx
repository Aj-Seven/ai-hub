import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="py-16 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Frequently Asked Questions
          </h2>
          <p>
            Everything you need to know about using AI Hub to power your
            writing.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger>What is AI Hub?</AccordionTrigger>
            <AccordionContent>
              AI Hub is a platform that brings together multiple AI models like
              OpenAI, Claude, Gemini, Cohere, and Ollama Local Models to help
              you write smarter, faster, and create better.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>
              Which AI providers are supported?
            </AccordionTrigger>
            <AccordionContent>
              We support a wide range of top AI providers including OpenAI,
              Anthropic's Claude, Google Gemini, Cohere, and more — all
              integrated seamlessly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>
              Do I need to know coding to use this?
            </AccordionTrigger>
            <AccordionContent>
              Not at all. Our tools are designed for all users, with a simple UI
              and intuitive workflows. No technical skills required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger>Is storing my API key safe?</AccordionTrigger>
            <AccordionContent>
              Yes — your API key is securely stored in your browser's local
              storage only. It never leaves your device and is not sent to any
              server.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
