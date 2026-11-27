import { ChatCompletionRequest, ChatCompletionResponse, ChatMessage } from "./types.js";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export class OpenRouterClient{
    private apiKey: string;

    constructor(apiKey: string){
        this.apiKey = apiKey
    }

    async createChatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse>{
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            const errorBody = await response.text();

            throw new Error(
                `OpenRouter API error (${response.status}): ${errorBody}`
            );
        }

        const data = (await response.json()) as ChatCompletionResponse;

        return data

    }
}