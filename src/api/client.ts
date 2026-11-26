import { ChatCompletionResponse, ChatMessage } from "./types.js";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export class OpenRouterClient{
    private apiKey: string;

    constructor(apiKey: string){
        this.apiKey = apiKey
    }

    async createChatCompletion(messages: ChatMessage[]){
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages
            })
        })

        if (!response.ok) {
            const errorBody = await response.text();

            throw new Error(
                `OpenRouter API error (${response.status}): ${errorBody}`
            );
        }

        const data = (await response.json()) as ChatCompletionResponse;

        const content = data.choices[0]?.message.content;

        if (!content) {
            throw new Error("No response content received from OpenRouter");
        }

        return content;
    }
}