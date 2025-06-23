import {
  GenerateRequest,
  GenerateResponse,
  Provider,
} from "@/types/api-client";

class APIClient {
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

      const response = await fetch("/api/generate", {
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
    ollamaStatus?: boolean;
    providers?: string[];
    aiProviders?: Provider[];
    error?: string;
  }> {
    const aiProviders: Provider[] = [
      { label: "OpenAI", value: "openai" },
      { label: "Anthropic Claude", value: "anthropic" },
      { label: "Google Gemini", value: "google" },
      { label: "Cohere", value: "cohere" },
    ];

    // Get all available providers
    const providers = Object.keys(localStorage)
      .filter((key) => key.startsWith("api_key_"))
      .map((key) => key.replace("api_key_", ""))
      .filter((provider) => aiProviders.map((p) => p.value).includes(provider));

    let status: string | undefined = undefined;
    let ollamaStatus: boolean | undefined = undefined;
    let errorMessages: string[] = [];

    try {
      const response = await fetch("/api/generate");
      if (response.ok) {
        const data = await response.json();
        status = data.status;
      } else {
        errorMessages.push("Failed to get /api/generate status");
      }
    } catch (err) {
      errorMessages.push("Fetch to /api/generate failed");
    }

    try {
      const host = localStorage.getItem("ollama_host");
      if (host) {
        const ollamaResponse = await fetch(host, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        ollamaStatus = ollamaResponse.ok;
      } else {
        errorMessages.push("Ollama host not found");
      }
    } catch (err) {
      errorMessages.push("Fetch to Ollama host failed");
    }

    return {
      success: errorMessages.length === 0,
      status,
      ollamaStatus,
      providers,
      aiProviders,
      error: errorMessages.length > 0 ? errorMessages.join("; ") : undefined,
    };
  }
}

export const apiClient = new APIClient();
