import { genAI, mergeOptions } from "./utils/ai.js";

export class Agent {
  constructor(options = {}, functions = {}) {
    this.options = mergeOptions(options);
    this.options.config.toolConfig = options.config.toolConfig || {
      functionCallingConfig: {
        mode: "AUTO",
      },
    };
    this.options.config.tools = options.config.tools || [];
    this.functions = functions;
    this.chat = genAI.chats.create(this.options);
  }

  async respond(prompt) {
    let response = await this.chat.sendMessage({
      message: prompt,
    });

    while (response.functionCalls && response.functionCalls.length > 0) {
      const functionResponses = await Promise.all(
        response.functionCalls.map(async (call) => {
          const { name, args } = call;
          const response = await this.functions[name](args);
          return {
            functionResponse: {
              name,
              response,
            },
          };
        })
      );

      response = await this.chat.sendMessage({
        message: functionResponses,
      });
    }

    return response.text;
  }
}
