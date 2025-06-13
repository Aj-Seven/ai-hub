export interface GenerateRequest {
  prompt: string;
  tool: string;
  options?: {
    tone?: string;
    style?: string;
    length?: string;
    platform?: string;
    maxTokens?: number;
    temperature?: number;
  };
  provider?: string;
  apiKey?: string;
}

export interface GenerateResponse {
  success: boolean;
  content?: string;
  provider?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
  details?: string;
}

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      if (
        !request.prompt ||
        !request.tool ||
        !request.apiKey ||
        typeof request.apiKey !== "string"
      ) {
        return {
          success: false,
          error: "Invalid request: Missing prompt, tool, or API key",
        };
      }

      const body: GenerateRequest = {
        prompt: request.prompt,
        tool: request.tool,
        provider: request.provider,
        apiKey: request.apiKey,
        options: {
          ...request.options,
          maxTokens: request.options?.maxTokens ?? 1000,
          temperature: request.options?.temperature ?? 0.7,
        },
      };

      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || "API request failed",
          details: errorData.details,
        };
      }

      const data: GenerateResponse = await response.json();
      return data;
    } catch (error) {
      console.error("API Client Error:", error);
      return {
        success: false,
        error: "Failed to connect to AI service",
        details: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getStatus(): Promise<{
    success: boolean;
    status?: string;
    providers?: string[];
    aiProviders?: { label: string; value: string }[];
    error?: string;
  }> {
    const aiProviders: { label: string; value: string }[] = [
      { label: "OpenAI", value: "openai" },
      { label: "Anthropic Claude", value: "anthropic" },
      { label: "Google Gemini", value: "google" },
      { label: "Cohere", value: "cohere" },
    ];

    try {
      const response = await fetch(`${this.baseURL}/api/generate`);

      if (!response.ok) {
        throw new Error("Failed to get API status");
      }

      const providers = Object.keys(localStorage)
        .filter((key) => key.startsWith("api_key_"))
        .map((key) => key.replace("api_key_", ""))
        .filter((provider) =>
          aiProviders.map((p) => p.value).includes(provider)
        );

      const data = await response.json();
      return {
        success: true,
        status: data.status,
        providers,
        aiProviders: aiProviders,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const apiClient = new APIClient();
