import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { History } from "./utils/history.js";
import { Agent } from "./agent_agent.js";
import { dateFunctionDeclaration, date } from "./tools/dateTool.js";
import {
  calculatorToolDeclarations,
  calculatorTools,
  mcpClients,
} from "./tools/mcp.js";
import { researchTool, researchToolDeclaration } from "./tools/agent_tools.js";
import {
  philNashBlogPosts,
  philNashBlogPostsDeclaration,
} from "./tools/rag.js";

const agent = new Agent(
  {
    config: {
      tools: [
        {
          functionDeclarations: [
            dateFunctionDeclaration,
            researchToolDeclaration,
            philNashBlogPostsDeclaration,
            ...calculatorToolDeclarations,
          ],
        },
      ],
      systemInstruction:
        "You are a helpful assistant. You can use your available tools to answer questions.",
    },
  },
  { date, ...calculatorTools, researchTool, philNashBlogPosts }
);

export async function main() {
  const history = new History();
  const readline = createInterface({
    input,
    output,
    terminal: true,
    history: history.messages.toReversed(),
    removeHistoryDuplicates: true,
  });

  let userInput = await readline.question("> ");

  while (userInput.toLowerCase() !== ".exit") {
    if (userInput.trim() === "") {
      userInput = await readline.question("> ");
      continue;
    }

    history.addMessage(userInput);

    try {
      const response = await agent.respond(userInput);
      output.write(`${response}\n`);
    } catch (error) {
      console.error("Error:", error);
    }

    userInput = await readline.question("> ");
  }

  await history.addMessage(userInput);

  mcpClients.forEach((client) => client.close());
  readline.close();
}
