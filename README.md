# Let's build an AI Agent

This is the example repo from the NDC Oslo talk [Let's build an AI Agent](https://ndcoslo.com/agenda/lets-build-an-ai-agent-0yft/0xehc20drdc).

The example application here shows everything from a [basic stateless bot](./src/basic_agent.js), to a [chat bot with history](./src/chat_agent.js) and a fully featured [agent that uses tools](./src/agent_agent.js).

- [Running the application](#running-the-application)
  - [Tools](#tools)
  - [MCP](#mcp)
- [Learn more](#learn-more)

## Running the application

First clone the repo:

```
git clone https://github.com/philnash/lets-build-an-ai-agent.git
cd lets-build-an-ai-agent
```

Install the dependencies:

```
npm install
```

Copy the .env file to .env.example:

```
cp .env.example .env
```

You will need a Gemini API key from [Google AI Studio](https://ai.dev) to run the model. Other items in the `.env.example` are used for different tools, if you don't want to use them, just don't import the tool.

Start the application with:

```
npm run dev
```

### Tools

You can include any of the tools in the `./src/tools` directory into the agent config in `./src/index.js`. Or write your own.

### MCP

The MCP tools are commented out as they download and run other applications on your system. You can uncomment them and run them if you would like.

## Learn more

You can learn more about the components in the talk through the links below:

- [Function calling in Gemini](https://ai.google.dev/gemini-api/docs/function-calling)
- Learn about all things [vector database and RAG on the DataStax blog](https://www.datastax.com/blog)
- [Build agents with drag and drop using Langflow](https://www.langflow.org/)
- Try Langflow out with [langflow.new](https://langflow.new)
- Learn more about building agents on the [Langflow blog](https://blog.langflow.org/)
