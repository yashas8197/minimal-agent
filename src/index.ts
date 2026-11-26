
import { Command } from "commander";
import "dotenv/config";
import { OpenRouterClient } from "./api/client.js";

// Create a CLI program
const program = new Command();

// Define the CLI command
program
  .name("min-agent")
  .description("A minimal coding assistant")
  .argument("<prompt>", "Prompt to send to the agent")
  .action(async (prompt: string) => {
    const apiKey = process.env.OPENROUTER_API_KEY

    if(!apiKey){
        console.error("Error: OPENROUTER_API_KEY is missing. Please add it to your .env file.")
        process.exitCode = 1;
        return
    }
    
    const client = new OpenRouterClient(apiKey);

    try{
        const response = await client.createChatCompletion(prompt);
        console.log("\nAssistant:", response);
    }catch (error) {
        console.error(
            "Error:",
            error instanceof Error ? error.message : error
        );
        process.exitCode = 1;
    }
  });

// Parse terminal arguments
program.parse();
