
export interface ChatCompletionResponse {
  choices: ChatCompletionChoice[];
}

export interface ChatCompletionChoice {
  message: {
    role: string;
    content: string | null;
  };
}

export interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ChatMessage {
    role: "system" | "user" | "assistant" | "tool";
    content: string;
    tool_calls?: ToolCall[];
    tool_call_id?: string;
}

export interface ToolDefinition {
  type: 'function',
  function: {
    name: string,
    description: string,
    parameters: Record<string, unknown>;
  }
}


