import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export default async function POST(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { host, ...rest } = body;

    const response = await fetch(`${host}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch from host" }),
        { status: response.status }
      );
    }

    const stream = response.body;

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
