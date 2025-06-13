import { BaseProvider } from "../base-provider";
import { AIRequest, AIResponse } from "../types";

export class HuggingFaceProvider extends BaseProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          inputs: `${this.getSystemPrompt(request.tool)}\n\n${request.prompt}`,
          parameters: {
            max_length: request.maxTokens || 1000,
            temperature: request.temperature || 0.7,
          },
        }),
      }
    );

    const data = await res.json();
    return {
      content: data[0]?.generated_text || "",
      provider: "huggingface",
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  }

  private getSystemPrompt(tool: string): string {
    const prompts: Record<string, string> = {
      "email-writer": "You are a professional email writing assistant...",
      "tweet-generator": "You are a Twitter expert...",
      "grammar-checker": "You are a grammar expert...",
      "sentence-builder": "You are a sentence builder expert...",
      "text-summarizer": "You are a text summarizer expert...",
      "content-rewriter": "You are a content rewriter expert...",
      "blog-generator": "You are a blog generator expert...",
      "caption-generator": "You are a caption generator expert...",
    };
    return prompts[tool] || "You are a helpful AI assistant.";
  }
}
