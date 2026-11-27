import { OpenRouterClient } from "../api/client.js";
import { ChatMessage } from "../api/types.js";
import { runAgentLoop } from "./agentLoop.js";

export class Conversation {
    private messages: ChatMessage[] = [];
    private client: OpenRouterClient;

    constructor(client: OpenRouterClient) {
        this.client = client;
    }

    async send(userMessage: string) {
        this.messages.push({
            role: "user",
            content: userMessage
        });

        this.messages = await runAgentLoop(
            this.client,
            this.messages
        );

        return this.messages[this.messages.length - 1]?.content ?? "";
    }
}