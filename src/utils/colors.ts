
export const colors = {
  header: (text: string) => `\x1b[1;36m${text}\x1b[0m`,
  prompt: (text: string) => `\x1b[1;32m${text}\x1b[0m`,
  muted: (text: string) => `\x1b[90m${text}\x1b[0m`,
  error: (text: string) => `\x1b[1;31m${text}\x1b[0m`,
  success: (text: string) => `\x1b[1;32m${text}\x1b[0m`,
  toolName: (text: string) => `\x1b[1;38;5;214m${text}\x1b[0m`,
  fileName: (text: string) => `\x1b[38;2;96;165;250m${text}\x1b[0m`,
};
