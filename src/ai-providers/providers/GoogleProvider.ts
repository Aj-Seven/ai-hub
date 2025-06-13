import { BaseProvider } from "../base-provider";
import { AIRequest, AIResponse } from "../types";

export class GoogleProvider extends BaseProvider {
  async generate(request: AIRequest): Promise<AIResponse> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${this.getSystemPrompt(request.tool)}\n\n${
                    request.prompt
                  }`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: request.temperature || 0.7,
            maxOutputTokens: request.maxTokens || 1000,
          },
        }),
      }
    );

    const data = await res.json();
    return {
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
      provider: "google",
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount || 0,
        completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: data.usageMetadata?.totalTokenCount || 0,
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
