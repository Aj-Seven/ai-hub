import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Shared CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

// Handle POST request
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { host } = body;

    if (!host || typeof host !== "string") {
      return new NextResponse(
        JSON.stringify({ error: "Missing or invalid 'host'" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const response = await fetch(`${host}/api/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch models from Ollama host" }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();

    return new NextResponse(JSON.stringify({ models: data.models }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
