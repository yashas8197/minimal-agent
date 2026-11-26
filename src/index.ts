import { Command } from "commander";
import React from "react";
import { render } from "ink";
import "dotenv/config";
import { App } from "./ui/App.js";

// Create a CLI program
const program = new Command();

// Define the CLI command
program
  .name("min-agent")
  .description("A minimal coding assistant")
  .action(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error(
        "Error: OPENROUTER_API_KEY is missing. Please add it to your .env file."
      );
      process.exitCode = 1;
      return;
    }

    // Launch the Ink application
    render(
      React.createElement(App, {
        apiKey,
      })
    );
  });

// Parse terminal arguments
program.parse();
