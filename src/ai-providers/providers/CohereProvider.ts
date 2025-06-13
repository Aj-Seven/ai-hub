import { BaseProvider } from "../base-provider";
import { AIRequest, AIResponse } from "../types";

export class CohereProvider extends BaseProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "command-light",
        prompt: `${this.getSystemPrompt(request.tool)}\n\n${request.prompt}`,
        max_tokens: request.maxTokens || 1000,
        temperature: request.temperature || 0.7,
      }),
    });

    const data = await res.json();
    return {
      content: data.generations?.[0]?.text || "",
      provider: "cohere",
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
