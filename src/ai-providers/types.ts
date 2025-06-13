export type AIProvider = "openai" | "anthropic" | "google" | "cohere";

export interface AIRequest {
  prompt: string;
  tool: string;
  options?: Record<string, any>;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ProviderConfig {
  apiKey: string;
  enabled?: boolean;
}
