export const resourceCategoryAssignments = [
  ["chatgpt", "ai-assistants"],
  ["claude", "ai-assistants"],
  ["gemini", "ai-assistants"],
  ["perplexity", "ai-assistants"],
  ["midjourney", "ai-image-generation"],
  ["suno", "ai-music"],
  ["ollama", "ai-development"],
  ["langchain", "ai-development"],
  ["llama", "ai-models"],
  ["mistral", "ai-models"],
] as const;

export const resourceTagAssignments = [
  ["chatgpt", ["chat", "writing", "coding", "research"]],
  ["claude", ["chat", "writing", "coding", "research"]],
  ["gemini", ["chat", "research", "coding"]],
  ["perplexity", ["research", "chat"]],
  ["midjourney", ["image-generation"]],
  ["suno", ["music-generation"]],
  ["ollama", ["local-ai", "developers"]],
  ["langchain", ["developers", "open-source"]],
  ["llama", ["open-weight", "developers"]],
  ["mistral", ["open-weight", "developers"]],
] as const;
