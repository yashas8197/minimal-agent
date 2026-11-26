
import React from "react";
import { Box, Text, Static } from "ink";
import Spinner from "ink-spinner";
import { colors } from "../../utils/colors.js";

export interface CompletedMessage {
  id: string;
  type: "user" | "assistant" | "error";
  content: string;
}

interface MessageListProps {
  completedMessages: CompletedMessage[];
  isLoading: boolean;
}

/**
 * Display conversation messages in the terminal.
    We'll support three message types initially:
    - user: User's input.
    - assistant: AI's response.
    - error: API or application errors.
 */

function MessageContent({ msg }: { msg: CompletedMessage }) {
  if (msg.type === "user") {
    return (
      <Box marginBottom={1}>
        <Text>
          {colors.prompt("> ")}
          {msg.content}
        </Text>
      </Box>
    );
  }

  if (msg.type === "assistant") {
    return (
      <Box marginBottom={1} flexDirection="column">
        <Text>{msg.content}</Text>
      </Box>
    );
  }

  if (msg.type === "error") {
    return (
      <Box marginBottom={1}>
        <Text>
          {colors.error("Error: ")}
          {msg.content}
        </Text>
      </Box>
    );
  }

  return null;
}

export function MessageList({
  completedMessages,
  isLoading,
}: MessageListProps) {
  return (
    <Box flexDirection="column">
      <Static items={completedMessages}>
        {(msg) => (
          <Box key={msg.id} flexDirection="column">
            <MessageContent msg={msg} />
          </Box>
        )}
      </Static>

      {isLoading && (
        <Box>
          <Text>
            <Spinner type="dots" />{" "}
          </Text>
          <Text>{colors.muted("Thinking...")}</Text>
        </Box>
      )}
    </Box>
  );
}
