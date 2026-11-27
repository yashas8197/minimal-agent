import { OpenRouterClient } from "../api/client.js";
import { ChatMessage } from "../api/types.js";
import { getToolDefinitions } from "../tools/index.js";
import { executeToolCalls } from "./toolExecutor.js";

export class Conversation {
    private messages: ChatMessage[] = [];
    private client: OpenRouterClient;

    constructor(client: OpenRouterClient) {
        this.client = client;
    }

    
     
     

    /**async send(userMessage: string) {
        this.messages.push({
            role: "user",
            content: userMessage
        })

        const response = await this.client.createChatCompletion({
            model: "openrouter/free",
            messages: this.messages,
            tools: getToolDefinitions()
        });

        console.log(response, "response")

        const assistantMessage = response.choices[0]?.message;

        if (!assistantMessage) {
            throw new Error("No assistant response received");
        }

        this.messages.push({
            role: "assistant",
            content: assistantMessage.content,
            tool_calls: assistantMessage.tool_calls
        });

        return assistantMessage.content ?? "get lost";
    }*/

    async send(userMessage: string) {
    this.messages.push({
        role: "user",
        content: userMessage
    });

    while (true) {
        const response = await this.client.createChatCompletion({
            model: "openrouter/free",
            messages: this.messages,
            tools: getToolDefinitions()
        });

        const assistantMessage = response.choices[0]?.message;

        if (!assistantMessage) {
            throw new Error("No assistant response received");
        }

        // Preserve the complete assistant response.
        this.messages.push({
            role: "assistant",
            content: assistantMessage.content,
            tool_calls: assistantMessage.tool_calls
        });

        // No tool calls means the assistant has finished.
        if (!assistantMessage.tool_calls?.length) {
            return assistantMessage.content ?? "";
        }

        // Execute the requested tools.
        const { messages: toolMessages } =
            await executeToolCalls(assistantMessage.tool_calls);

        // Add tool results to conversation history.
        this.messages.push(...toolMessages);
    }
}
}