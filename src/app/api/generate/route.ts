import { NextRequest } from "next/server";
import { AIService } from "@/ai-providers/ai-service";
import { AIRequest, AIProvider } from "@/ai-providers/types";

export const runtime = "edge";

// Shared CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

// Handle POST request
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { prompt, tool, options = {}, provider, apiKey } = body;

    if (typeof prompt !== "string" || typeof tool !== "string") {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid "prompt" or "tool"' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!apiKey || typeof apiKey !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid API key" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!provider || typeof provider !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid provider" }),
        { status: 400, headers: corsHeaders }
      );
    }

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
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate content",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle GET request
export async function GET(): Promise<Response> {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        status: "AI Hub API is running",
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get provider status" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS preflight
export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
