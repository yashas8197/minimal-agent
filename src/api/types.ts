
export interface ChatCompletionResponse {
  choices: ChatCompletionChoice[];
}

export interface ChatCompletionChoice {
  message: {
    role: string;
    content: string | null;
  };
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}
