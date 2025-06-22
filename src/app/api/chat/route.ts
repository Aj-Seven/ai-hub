import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { host, ...rest } = body;

    if (!host || typeof host !== "string") {
      return new NextResponse(
        JSON.stringify({ error: 'Missing or invalid "host"' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const upstreamResponse = await fetch(`${host}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch from host" }),
        { status: upstreamResponse.status || 502, headers: corsHeaders }
      );
    }

    // Forward the streaming body
    return new NextResponse(upstreamResponse.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in /api/chat POST:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
