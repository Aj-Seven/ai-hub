import { NextRequest } from "next/server";
import { AIService } from "@/ai-providers/ai-service";
import { AIRequest, AIProvider } from "@/ai-providers/types";

export const runtime = "edge";

export default async function handler(request: NextRequest) {
  switch (request.method) {
    case "POST":
      return await handlePost(request);
    case "GET":
      return await handleGet();
    default:
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "content-type": "application/json" },
      });
  }
}

async function handlePost(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { prompt, tool, options = {}, provider, apiKey } = body;

    // Basic validations
    if (typeof prompt !== "string" || typeof tool !== "string") {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid "prompt" or "tool"' }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!apiKey || typeof apiKey !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid API key" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!provider || typeof provider !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid provider" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Create AIService instance with a single provider
    const aiService = new AIService(provider as AIProvider, apiKey);

    const aiRequest: AIRequest = {
      prompt,
      tool,
      options,
      maxTokens: options?.maxTokens ?? 1000,
      temperature: options?.temperature ?? 0.7,
    };

    const response = await aiService.generate(aiRequest);

    return new Response(
      JSON.stringify({
        success: true,
        content: response.content,
        provider: provider,
        usage: response.usage,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate content",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

async function handleGet(): Promise<Response> {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        status: "AI Hub API is running",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get provider status" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
