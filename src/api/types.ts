
export interface ChatCompletionResponse {
  choices: ChatCompletionChoice[];
}

export interface ChatCompletionChoice {
  message: {
    role: string;
    content: string | null;
    tool_calls?: ToolCall[];
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
    content: string | null;
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

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  tools?: ToolDefinition[];
}


