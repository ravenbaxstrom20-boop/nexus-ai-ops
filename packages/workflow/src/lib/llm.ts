import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export interface LLMProvider {
  name: string;
  generateText(prompt: string): Promise<string | null>;
}

export class GeminiProvider implements LLMProvider {
  name = "gemini";
  private model: any;

  constructor(apiKey: string, modelName: string = "gemini-1.5-flash") {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  async generateText(prompt: string): Promise<string | null> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  }
}

export class OpenAIProvider implements LLMProvider {
  name = "openai";
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateText(prompt: string): Promise<string | null> {
    try {
      const response = await this.client.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI Error:", error);
      return null;
    }
  }
}

export class AnthropicProvider implements LLMProvider {
  name = "anthropic";
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateText(prompt: string): Promise<string | null> {
    try {
      const message = await this.client.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });
      return (message.content[0] as any).text;
    } catch (error) {
      console.error("Anthropic Error:", error);
      return null;
    }
  }
}

export class MockLLMProvider implements LLMProvider {
  name = "mock";
  async generateText(prompt: string): Promise<string | null> {
    console.log(`[MockLLM] Would process prompt: ${prompt.substring(0, 100)}...`);
    return null;
  }
}

export function getLLMProvider(): LLMProvider {
  if (process.env.OPENAI_API_KEY) {
    return new OpenAIProvider(process.env.OPENAI_API_KEY);
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return new AnthropicProvider(process.env.ANTHROPIC_API_KEY);
  }
  if (process.env.GEMINI_API_KEY) {
    return new GeminiProvider(process.env.GEMINI_API_KEY);
  }
  
  console.warn("No LLM API keys found. Using MockLLMProvider.");
  return new MockLLMProvider();
}
