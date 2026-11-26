
import React from "react";
import { Box, Text } from "ink";
import { colors } from "../utils/colors.js";
import { REPL } from "./REPL.js";

interface AppProps {
  apiKey: string;
}

export function App({ apiKey }: AppProps) {
  return (
    <Box flexDirection="column">
      <Box marginBottom={1} paddingX={1}>
        <Text>{colors.header("min-agent")}</Text>
      </Box>

      <Box paddingX={1} marginBottom={1}>
        <Text>
          {colors.muted('Type a message to chat. "exit" to quit.')}
        </Text>
      </Box>

      <REPL apiKey={apiKey} />
    </Box>
  );
}
