import dotenv from "dotenv";
import { resolveLogo } from "@/lib/logos";

dotenv.config({
  path: ".env.local",
});

async function seed() {
  const { db } = await import("@/db");
  const {
    categories,
    resources,
    resourceCategories,
    resourceTags,
    tags,
  } = await import("@/db/schema");

  const seedResources = [
    {
      type: "tool" as const,
      name: "ChatGPT",
      slug: "chatgpt",
      tagline:
        "AI assistant for writing, analysis, coding, and research.",
      description:
        "An AI assistant for conversation, writing, coding, analysis, research, and everyday productivity.",
      websiteUrl: "https://chatgpt.com",
      pricingModel: "freemium" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "tool" as const,
      name: "Claude",
      slug: "claude",
      tagline:
        "AI assistant for reasoning, writing, coding, and analysis.",
      description:
        "An AI assistant designed for writing, reasoning, coding, research, and working with complex information.",
      websiteUrl: "https://claude.ai",
      pricingModel: "freemium" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "tool" as const,
      name: "Gemini",
      slug: "gemini",
      tagline:
        "Google's AI assistant for multimodal tasks and productivity.",
      description:
        "A multimodal AI assistant for conversation, research, writing, coding, image understanding, and productivity.",
      websiteUrl: "https://gemini.google.com",
      pricingModel: "freemium" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "tool" as const,
      name: "Perplexity",
      slug: "perplexity",
      tagline:
        "AI-powered search and research assistant.",
      description:
        "An AI search and research platform that combines conversational answers with web-based information discovery.",
      websiteUrl: "https://www.perplexity.ai",
      pricingModel: "freemium" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "tool" as const,
      name: "Midjourney",
      slug: "midjourney",
      tagline:
        "Generative AI platform for creating images.",
      description:
        "A generative AI platform focused on creating and exploring images from natural-language instructions.",
      websiteUrl: "https://www.midjourney.com",
      pricingModel: "paid" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "tool" as const,
      name: "Suno",
      slug: "suno",
      tagline: "AI music creation platform.",
      description:
        "An AI music generation platform for creating songs and musical compositions from natural-language ideas.",
      websiteUrl: "https://suno.com",
      pricingModel: "freemium" as const,
      sourceModel: "proprietary" as const,
      isVerified: true,
    },
    {
      type: "framework" as const,
      name: "Ollama",
      slug: "ollama",
      tagline:
        "Run large language models locally.",
      description:
        "A platform for running and managing large language models locally on personal computers and servers.",
      websiteUrl: "https://ollama.com",
      repositoryUrl:
        "https://github.com/ollama/ollama",
      pricingModel: "free" as const,
      sourceModel: "open_source" as const,
      isVerified: true,
    },
    {
      type: "framework" as const,
      name: "LangChain",
      slug: "langchain",
      tagline:
        "Framework for building applications powered by language models.",
      description:
        "An open-source framework and ecosystem for developing applications that use language models, agents, retrieval, and tools.",
      websiteUrl: "https://www.langchain.com",
      repositoryUrl:
        "https://github.com/langchain-ai/langchain",
      pricingModel: "open_source" as const,
      sourceModel: "open_source" as const,
      isVerified: true,
    },
    {
      type: "model" as const,
      name: "Llama",
      slug: "llama",
      tagline:
        "Meta's family of large language models.",
      description:
        "A family of large language models from Meta designed for research, development, and a broad range of AI applications.",
      websiteUrl: "https://www.llama.com",
      pricingModel: "free" as const,
      sourceModel: "open_weight" as const,
      isVerified: true,
    },
    {
      type: "model" as const,
      name: "Mistral",
      slug: "mistral",
      tagline:
        "Open and commercial generative AI models.",
      description:
        "A family of generative AI models and services from Mistral AI, including models available for development and deployment.",
      websiteUrl: "https://mistral.ai",
      pricingModel: "freemium" as const,
      sourceModel: "open_weight" as const,
      isVerified: true,
    },
  ];

  const seedCategories = [
    {
      name: "AI Assistants",
      slug: "ai-assistants",
      description:
        "AI assistants for conversation, productivity, research, and everyday work.",
    },
    {
      name: "AI Image Generation",
      slug: "ai-image-generation",
      description:
        "Tools and models for generating and editing images with AI.",
    },
    {
      name: "AI Music",
      slug: "ai-music",
      description:
        "AI tools and models for music and audio generation.",
    },
    {
      name: "AI Development",
      slug: "ai-development",
      description:
        "Frameworks, libraries, and tools for building AI applications.",
    },
    {
      name: "AI Models",
      slug: "ai-models",
      description:
        "Discover language, multimodal, image, audio, and other AI models.",
    },
  ];

  const seedTags = [
    "chat",
    "research",
    "coding",
    "writing",
    "image-generation",
    "music-generation",
    "local-ai",
    "open-source",
    "open-weight",
    "developers",
  ];

  console.log("Starting ToolsTok seed...");

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------

  const categoryRows: (typeof categories.$inferSelect)[] = [];

  for (const category of seedCategories) {
    const result = await db
      .insert(categories)
      .values(category)
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: category.name,
          description: category.description,
        },
      })
      .returning();

    if (result[0]) {
      categoryRows.push(result[0]);
    }
  }

  // ---------------------------------------------------------------------------
  // Tags
  // ---------------------------------------------------------------------------

  const tagRows: (typeof tags.$inferSelect)[] = [];

  for (const tagName of seedTags) {
    const result = await db
      .insert(tags)
      .values({
        name: tagName,
        slug: tagName,
      })
      .onConflictDoUpdate({
        target: tags.slug,
        set: {
          name: tagName,
        },
      })
      .returning();

    if (result[0]) {
      tagRows.push(result[0]);
    }
  }

  // ---------------------------------------------------------------------------
  // Resources
  // ---------------------------------------------------------------------------

  const resourceValues = [];

for (const resource of seedResources) {
  const logo = resource.websiteUrl
    ? await resolveLogo(resource.websiteUrl)
    : null;

  resourceValues.push({
    ...resource,
    domain: logo?.domain ?? null,
    logoUrl: logo?.logoUrl ?? null,
    logoSource:
      logo?.source ?? "unknown",
    logoUpdatedAt: logo
      ? new Date()
      : null,
    status: "published" as const,
  });
}

  const insertedResources: (typeof resources.$inferSelect)[] =
    [];

  for (const resource of resourceValues) {
    const result = await db
      .insert(resources)
      .values(resource)
      .onConflictDoUpdate({
        target: resources.slug,
        set: {
          domain: resource.domain,
          logoUrl: resource.logoUrl,
          logoSource: resource.logoSource,
          logoUpdatedAt:
            resource.logoUpdatedAt,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (result[0]) {
      insertedResources.push(result[0]);
    }
  }

  console.log(
    `Processed categories: ${categoryRows.length}`,
  );

  console.log(
    `Processed tags: ${tagRows.length}`,
  );

  console.log(
    `Processed resources: ${insertedResources.length}`,
  );

  // ---------------------------------------------------------------------------
  // Maps
  // ---------------------------------------------------------------------------

  const categoryMap = new Map(
    categoryRows.map((category) => [
      category.slug,
      category,
    ]),
  );

  const tagMap = new Map(
    tagRows.map((tag) => [
      tag.slug,
      tag,
    ]),
  );

  const resourceMap = new Map(
    insertedResources.map((resource) => [
      resource.slug,
      resource,
    ]),
  );

  // ---------------------------------------------------------------------------
  // Resource → Category relationships
  // ---------------------------------------------------------------------------

  const resourceCategoryAssignments = [
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

  const categoryAssignments =
    resourceCategoryAssignments
      .map(
        ([resourceSlug, categorySlug]) => {
          const resource =
            resourceMap.get(resourceSlug);

          const category =
            categoryMap.get(categorySlug);

          if (!resource || !category) {
            return null;
          }

          return {
            resourceId: resource.id,
            categoryId: category.id,
          };
        },
      )
      .filter(
        (
          value,
        ): value is {
          resourceId: string;
          categoryId: string;
        } => value !== null,
      );

  if (categoryAssignments.length > 0) {
    await db
      .insert(resourceCategories)
      .values(categoryAssignments)
      .onConflictDoNothing();
  }

  // ---------------------------------------------------------------------------
  // Resource → Tag relationships
  // ---------------------------------------------------------------------------

  const resourceTagAssignments = [
    [
      "chatgpt",
      ["chat", "writing", "coding", "research"],
    ],
    [
      "claude",
      ["chat", "writing", "coding", "research"],
    ],
    [
      "gemini",
      ["chat", "research", "coding"],
    ],
    [
      "perplexity",
      ["research", "chat"],
    ],
    [
      "midjourney",
      ["image-generation"],
    ],
    [
      "suno",
      ["music-generation"],
    ],
    [
      "ollama",
      ["local-ai", "developers"],
    ],
    [
      "langchain",
      ["developers", "open-source"],
    ],
    [
      "llama",
      ["open-weight", "developers"],
    ],
    [
      "mistral",
      ["open-weight", "developers"],
    ],
  ] as const;

  const tagAssignments =
    resourceTagAssignments.flatMap(
      ([resourceSlug, resourceTags]) => {
        const resource =
          resourceMap.get(resourceSlug);

        if (!resource) {
          return [];
        }

        return resourceTags
          .map((tagSlug) => {
            const tag =
              tagMap.get(tagSlug);

            if (!tag) {
              return null;
            }

            return {
              resourceId: resource.id,
              tagId: tag.id,
            };
          })
          .filter(
            (
              value,
            ): value is {
              resourceId: string;
              tagId: string;
            } => value !== null,
          );
      },
    );

  if (tagAssignments.length > 0) {
    await db
      .insert(resourceTags)
      .values(tagAssignments)
      .onConflictDoNothing();
  }

  console.log(
    "Resource relationships created.",
  );

  console.log(
    "ToolsTok seed completed successfully.",
  );
}

seed()
  .catch((error) => {
    console.error(
      "ToolsTok seed failed.",
    );
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });