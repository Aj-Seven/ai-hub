import { BaseProvider } from "../base-provider";
import { AIRequest, AIResponse } from "../types";
import OpenAI from "openai";

export class OpenAIProvider extends BaseProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    super(apiKey);
    this.client = new OpenAI({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const completion = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: this.getSystemPrompt(request.tool) },
        { role: "user", content: request.prompt },
      ],
      max_tokens: request.maxTokens || 1000,
      temperature: request.temperature || 0.7,
    });

    return {
      content: completion.choices[0]?.message?.content || "",
      provider: "openai",
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
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
