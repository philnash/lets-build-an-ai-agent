import { mergeOptions, genAI } from "./utils/ai.js";

export class Agent {
  constructor(options = {}) {
    this.options = mergeOptions(options);
  }

  async respond(prompt) {
    const response = await genAI.models.generateContent({
      contents: prompt,
      ...this.options,
    });
    return response.text;
  }
}
