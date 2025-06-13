import { AIProvider, AIRequest, AIResponse, ProviderConfig } from "./types";
import { OpenAIProvider } from "./providers/OpenAIProvider";
import { AnthropicProvider } from "./providers/AnthropicProvider";
import { GoogleProvider } from "./providers/GoogleProvider";
import { CohereProvider } from "./providers/CohereProvider";
import { HuggingFaceProvider } from "./providers/HuggingFaceProvider";
import { BaseProvider } from "./base-provider";

export class AIService {
  private providerInstance: BaseProvider;

  constructor(provider: AIProvider, apiKey: string) {
    switch (provider) {
      case "openai":
        this.providerInstance = new OpenAIProvider(apiKey);
        break;
      case "anthropic":
        this.providerInstance = new AnthropicProvider(apiKey);
        break;
      case "google":
        this.providerInstance = new GoogleProvider(apiKey);
        break;
      case "cohere":
        this.providerInstance = new CohereProvider(apiKey);
        break;
      case "huggingface":
        this.providerInstance = new HuggingFaceProvider(apiKey);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    return this.providerInstance.generate(request);
  }
}
