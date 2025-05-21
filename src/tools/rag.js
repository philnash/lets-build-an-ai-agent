import { DataAPIClient } from "@datastax/astra-db-ts";
import { env } from "node:process";

const client = new DataAPIClient(env.ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(env.ASTRA_DB_API_ENDPOINT);
const collection = db.collection(env.ASTRA_DB_COLLECTION_NAME);

export const philNashBlogPostsDeclaration = {
  name: "philNashBlogPosts",
  description:
    "Search for blog posts written by Phil Nash, on topics like web development, JavaScript, and Ruby",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The query to search for blog posts.",
      },
    },
    required: ["query"],
  },
};

export async function philNashBlogPosts({ query }) {
  console.log("[think] Searching Phil's blog for posts about:", query);
  const cursor = collection.find(
    {},
    { sort: { $vectorize: query }, projection: { $vectorize: 1 } }
  );
  return {
    results: (await cursor.toArray()).map((doc) => doc.$vectorize).join("\n"),
  };
}
