
export interface ChatCompletionResponse {
  choices: ChatCompletionChoice[];
}

export interface ChatCompletionChoice {
  message: {
    role: string;
    content: string | null;
  };
}
