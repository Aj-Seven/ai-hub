import { AIRequest, AIResponse } from './types';

export abstract class BaseProvider {
  protected apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  abstract generate(request: AIRequest): Promise<AIResponse>;
}
