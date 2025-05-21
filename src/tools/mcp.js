import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { env } from "node:process";

const calculator = new StdioClientTransport({
  command: "uvx",
  args: ["mcp-server-calculator"],
});

const calculatorClient = new Client({
  name: "calculator",
  version: "1.0.0",
});

await calculatorClient.connect(calculator);

export const calculatorToolDeclarations =
  turnMCPDeclarationsToGeminiDeclarations(await calculatorClient.listTools());

export const calculatorTools = calculatorToolDeclarations.reduce(
  (acc, tool) => {
    acc[tool.name] = async (args) => {
      console.log(`[think] Calling ${tool.name} with ${JSON.stringify(args)}`);
      return await calculatorClient.callTool({
        name: tool.name,
        arguments: args,
      });
    };
    return acc;
  },
  {}
);

const tavily = new StdioClientTransport({
  command: "npx",
  args: ["-y", "tavily-mcp"],
  env: {
    TAVILY_API_KEY: env.TAVILY_API_KEY,
    PATH: env.PATH,
  },
});

const tavilyClient = new Client({
  name: "tavily",
  version: "1.0.0",
});

await tavilyClient.connect(tavily);

export const tavilyToolDeclarations = turnMCPDeclarationsToGeminiDeclarations(
  await tavilyClient.listTools()
);

export const tavilyTools = tavilyToolDeclarations.reduce((acc, tool) => {
  acc[tool.name] = async (args) => {
    console.log(`[think] Calling ${tool.name} with ${JSON.stringify(args)}`);
    return await tavilyClient.callTool({
      name: tool.name,
      arguments: args,
    });
  };
  return acc;
}, {});

function turnMCPDeclarationsToGeminiDeclarations(mcpTool) {
  return mcpTool.tools.map((tool) => {
    // Filter the parameters to exclude not supported keys
    const parameters = Object.fromEntries(
      Object.entries(tool.inputSchema).filter(
        ([key]) => !["additionalProperties", "$schema"].includes(key)
      )
    );
    return {
      name: tool.name,
      description: tool.description,
      parameters: parameters,
    };
  });
}

export const mcpClients = [calculatorClient, tavilyClient];
