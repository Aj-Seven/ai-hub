import { BaseProvider } from "../base-provider";
import { AIRequest, AIResponse } from "../types";

export class AnthropicProvider extends BaseProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: request.maxTokens || 1000,
        messages: [
          {
            role: "user",
            content: `${this.getSystemPrompt(request.tool)}\n\n${
              request.prompt
            }`,
          },
        ],
      }),
    });

    const data = await res.json();
    return {
      content: data || "",
      provider: "anthropic",
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens:
          (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
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
