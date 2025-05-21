import { genAI, mergeOptions } from "./utils/ai.js";

export class Agent {
  constructor(options = {}) {
    this.options = mergeOptions(options);
    this.chat = genAI.chats.create(this.options);
  }

  async respond(prompt) {
    const response = await this.chat.sendMessage({
      message: prompt,
    });
    return response.text;
  }
}
