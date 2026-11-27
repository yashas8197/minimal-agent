import { readFile } from "node:fs/promises";
import { z } from "zod";
import type { Tool, ToolResult } from "./types.js";

const inputSchema = z.object({
  file_path: z.string().describe("Path to the file to read"),
});

export const readTool: Tool = {
  name: "read",
  description: "Read the contents of a file",

  inputSchema,

  async call(input): Promise<ToolResult> {
    const { file_path } = inputSchema.parse(input);

    try {
      const content = await readFile(file_path, "utf-8");

      return {
        output: content,
      };
    } catch (error) {
      return {
        output: `Failed to read file: ${
          error instanceof Error ? error.message : String(error)
        }`,
        isError: true,
      };
    }
  },

  renderToolCall(input) {
    return `Reading file: ${String(input.file_path)}`;
  },

  renderResult(result) {
    return result.output;
  },
};