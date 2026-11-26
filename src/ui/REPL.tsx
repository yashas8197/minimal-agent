
import React, { useState, useCallback, useRef } from "react";
import { Box, useApp } from "ink";

import { TextInput } from "./components/TextInput.js";
import {
  MessageList,
  type CompletedMessage,
} from "./components/MessageList.js";

import { Conversation } from "../core/conversation.js";
import { OpenRouterClient } from "../api/client.js";

interface REPLProps {
  apiKey: string;
}

/**
 * 
 */

export function REPL({ apiKey }: REPLProps) {
  const { exit } = useApp();

  const [completedMessages, setCompletedMessages] =
    useState<CompletedMessage[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const msgIdRef = useRef(0);

  // Keep one Conversation instance for the entire REPL session.
  const conversationRef = useRef(
    new Conversation(new OpenRouterClient(apiKey))
  );

  const nextId = useCallback(() => {
    msgIdRef.current += 1;
    return String(msgIdRef.current);
  }, []);

  const handleSubmit = useCallback(
    async (input: string) => {
      if (
        input.toLowerCase() === "exit" ||
        input.toLowerCase() === "quit"
      ) {
        exit();
        return;
      }

      // Display user message
      setCompletedMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "user",
          content: input,
        },
      ]);

      setIsLoading(true);

      try {
        // Send message to the Conversation class
        const response = await conversationRef.current.send(input);

        // Display assistant response
        setCompletedMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            type: "assistant",
            content: response,
          },
        ]);
      } catch (error) {
        setCompletedMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            type: "error",
            content:
              error instanceof Error
                ? error.message
                : String(error),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [exit, nextId]
  );

  return (
    <Box flexDirection="column" padding={1}>
      <MessageList
        completedMessages={completedMessages}
        isLoading={isLoading}
      />

      <TextInput
        onSubmit={handleSubmit}
        isDisabled={isLoading}
      />
    </Box>
  );
}
