import { OpenRouterClient } from "../api/client.js";
import { ChatMessage } from "../api/types.js";


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
        })

        const assistantResponse = await this.client.createChatCompletion(this.messages)

        this.messages.push({
            role: "assistant",
            content: assistantResponse
        })

        return assistantResponse;
    }
}