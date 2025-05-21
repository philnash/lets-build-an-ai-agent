import { NodeHtmlMarkdown } from "node-html-markdown";

export const fetchUrlDeclaration = {
  name: "fetchUrl",
  description: "Fetch the content of a URL or browser a website.",
  parameters: {
    type: "object",
    description: "The URL to fetch",
    required: ["url"],
    properties: {
      url: {
        type: "string",
        description: "The URL to fetch",
      },
    },
  },
};

const nhm = new NodeHtmlMarkdown();

export async function fetchUrl({ url }) {
  console.log("[think] Fetching URL:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }
  const text = nhm.translate(await response.text());
  return { output: text };
}
