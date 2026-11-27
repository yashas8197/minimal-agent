import { readTool } from "./read.js";
import type { Tool } from "./types.js";
import { z } from "zod";
import type { ToolDefinition } from "../api/types.js";

const toolRegistry = new Map<string, Tool>();

export function registerTool(tool: Tool) {
  toolRegistry.set(tool.name, tool);
}

registerTool(readTool);

export function getTool(name: string): Tool | undefined {
  return toolRegistry.get(name);
}

export function getAllTools(): Tool[] {
  return Array.from(toolRegistry.values());
}

export function getToolDefinitions(): ToolDefinition[] {
  return getAllTools().map((tool) => {
    const jsonSchema = z.toJSONSchema(tool.inputSchema, {
      target: "openapi-3.0",
      reused: "inline",
    });

    const { $schema, ...parameters } =
      jsonSchema as Record<string, unknown>;

    return {
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters,
      },
    };
  });
}