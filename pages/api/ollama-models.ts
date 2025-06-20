import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export default async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { host } = body;

    if (!host || typeof host !== "string") {
      return new NextResponse(
        JSON.stringify({ error: "Missing or invalid host" }),
        {
          status: 400,
        }
      );
    }

    const res = await fetch(`${host}/api/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch models from Ollama host" }),
        { status: res.status }
      );
    }

    const data = await res.json();

    return new NextResponse(JSON.stringify({ models: data.models }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
