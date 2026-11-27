import type { ChatMessage } from "../api/types.js";
import { OpenRouterClient } from "../api/client.js";
import { getToolDefinitions } from "../tools/index.js";
import { executeToolCalls } from "./toolExecutor.js";
import { buildSystemPrompt } from "./systemPrompt.js";

export async function runAgentLoop(
    client: OpenRouterClient,
    messages: ChatMessage[]
): Promise<ChatMessage[]> {

    while (true) {
        const response = await client.createChatCompletion({
            model: "openrouter/free",
            messages: [
                {
                    role: "system",
                    content: buildSystemPrompt()
                },
                ...messages
            ],
            tools: getToolDefinitions()
        });

        const assistantMessage = response.choices[0]?.message;

        if (!assistantMessage) {
            throw new Error("No assistant response received");
        }

        messages.push({
            role: "assistant",
            content: assistantMessage.content,
            tool_calls: assistantMessage.tool_calls
        });

        if (!assistantMessage.tool_calls?.length) {
            return messages;
        }

        const { messages: toolMessages } =
            await executeToolCalls(assistantMessage.tool_calls);

        messages.push(...toolMessages);
    }

}