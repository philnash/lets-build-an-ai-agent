import { Agent } from "../agent_agent.js";
import { fetchUrl, fetchUrlDeclaration } from "./fetchTool.js";

const researchAgent = new Agent(
  {
    config: {
      systemInstruction:
        "You are a research assistant. Use the Fetch URL tool to look up things on the Internet and return a report based on your findings.",
      tools: [
        {
          functionDeclarations: [fetchUrlDeclaration],
        },
      ],
    },
  },
  { fetchUrl }
);

export const researchTool = async ({ query }) => {
  const response = await researchAgent.respond(query);
  return { response };
};

export const researchToolDeclaration = {
  name: "researchTool",
  description: "Research tool for looking up information on the internet.",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The query to research using the web.",
      },
    },
    required: ["query"],
  },
};
