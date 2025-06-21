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

export type Provider = {
  value: string;
  label: string;
};
