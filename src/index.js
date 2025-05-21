import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { History } from "./utils/history.js";
import { Agent } from "./basic_agent.js";
import { mcpClients } from "./tools/mcp.js";

const agent = new Agent();

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
