import { GoogleGenAI } from "@google/genai";
import { env } from "node:process";

export function mergeOptions(options) {
  return {
    model: options.model || "gemini-2.0-flash",
    config: {
      temperature: options.config.temperature || 0.2,
      topP: options.config.topP || 0.95,
      topK: options.config.topK || 30,
      systemInstruction:
        options.config.systemInstruction || "You are a helpful assistant.",
    },
  };
}

export const genAI = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });
