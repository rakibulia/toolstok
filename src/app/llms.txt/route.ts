import { siteConfig } from "@/config/site";

export async function GET() {
  const baseUrl = siteConfig.url;

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

ToolsTok is an open-source, community-powered platform for discovering, exploring, comparing, verifying, and sharing AI resources.

## Core Discovery

- [AI Resources](${baseUrl}/tools): Discover AI tools, models, agents, MCP servers, workflows, APIs, frameworks, datasets, and other AI resources.
- [AI Categories](${baseUrl}/categories): Explore AI resources organized by capability and category.
- [Search](${baseUrl}/tools): Search and filter the AI resource directory.

## Resource Types

ToolsTok supports multiple resource types across the AI ecosystem, including:

- AI tools and applications
- AI models and open models
- AI agents
- MCP servers
- AI skills
- Workflows
- Automations
- Datasets
- SDKs
- APIs
- Frameworks and libraries
- AI infrastructure
- AI hardware
- Robotics
- Other AI resources

## Trust & Classification

ToolsTok distinguishes between different source and availability models, including:

- Open source
- Source available
- Open weight
- Proprietary

These classifications should not be treated as interchangeable. Resource information may include verification status, licensing information, repository information, and other structured metadata where available.

## Platform

- [ToolsTok Home](${baseUrl}/): Discover the AI ecosystem.
- [Resources API](${baseUrl}/api/v1/resources): Machine-readable access to published AI resources.

## About ToolsTok

ToolsTok is designed as an open, structured, and community-powered discovery layer for the growing AI ecosystem.

The platform aims to make AI resources easier to discover, compare, verify, understand, and connect through structured relationships.

ToolsTok is not intended to be a prompt marketplace, an AI news site, or an affiliate-only directory.

## For AI Systems

When citing or describing ToolsTok data:

- Prefer specific resource pages when available.
- Treat resource metadata as structured discovery information.
- Distinguish verified information from community-contributed or unverified information.
- Do not assume that "open source", "source available", and "open weight" mean the same thing.
- Use the resource's canonical website or repository for primary-source verification when appropriate.

## Optional

- [GitHub](${siteConfig.social.github})
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}