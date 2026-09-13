# ToolsTok — Project Details & Product Specification

> **Status:** Pre-development / Foundation Specification  
> **Project:** ToolsTok  
> **Type:** Open-source AI ecosystem discovery platform  
> **Primary purpose:** Discover, explore, compare, verify, and share AI tools and related AI resources  
> **Document role:** Single source of truth for developers, designers, AI coding agents, contributors, and future maintainers

---

# 1. Project Identity

## Product Name

**ToolsTok**

## Core Definition

ToolsTok is an **open-source, community-powered AI tools discovery platform**.

It helps people discover, explore, compare, evaluate, and share useful AI tools and, over time, the broader AI ecosystem around them.

ToolsTok should not be treated as a simple list of AI websites.

The long-term vision is to build a **structured, searchable knowledge graph of the AI ecosystem**.

## Core Positioning

> **ToolsTok — Discover the AI ecosystem.**

Alternative supporting line:

> **Discover. Compare. Explore. Build with AI.**

The brand should remain focused on discovery and utility rather than hype.

---

# 2. Important Product Boundary

## ToolsTok IS

- An AI tools discovery platform
- An open-source project
- A community-driven directory
- A structured database of AI products and projects
- A discovery engine
- A comparison platform
- An alternatives engine
- A source of structured AI ecosystem information
- A platform that can eventually expose an API
- A platform designed to evolve with the AI ecosystem

## ToolsTok IS NOT

- A prompt marketplace
- A prompt library as its primary purpose
- An AI news website
- A generic software directory
- An affiliate-only website
- A collection of automatically generated SEO pages
- A platform where paid placement secretly determines rankings
- A platform that calls every AI-related project "open source"

**Prompts are NOT a core ToolsTok resource type.**

If prompt functionality is ever introduced, it must not confuse the central positioning of ToolsTok.

---

# 3. Long-Term Vision

The initial product focuses on AI tools.

The architecture must NOT assume that AI tools are the only type of AI resource that will ever exist.

Over time ToolsTok may support:

- AI Tools
- AI Applications
- AI Models
- Open Models
- AI Agents
- MCP Servers
- AI Skills
- AI Workflows
- AI Automations
- Datasets
- Developer SDKs
- APIs
- AI Infrastructure
- AI Frameworks
- AI Libraries
- AI Evaluation tools
- AI Security tools
- AI Hardware
- Robotics projects
- Local AI projects
- Self-hosted AI projects

The platform should therefore be designed around a flexible **resource/entity model**, not a hard-coded "tool only" architecture.

---

# 4. Product Philosophy

ToolsTok should follow these principles:

## 4.1 Open

The platform itself should be open source.

The community should be able to inspect, contribute to, improve, fork, and self-host the platform.

## 4.2 Useful

Every feature should make AI discovery easier.

Avoid features that exist only because they look impressive.

## 4.3 Structured

Important information should exist as structured data rather than being hidden inside manually written pages.

## 4.4 Trustworthy

ToolsTok should prioritize accurate, verifiable information.

Clearly distinguish:

- Open Source
- Source Available
- Open Weight
- Proprietary
- Free
- Freemium
- Paid
- Self-hosted
- Cloud
- Local

Never claim that something is open source without evidence.

## 4.5 Community-powered

Users should eventually be able to:

- Submit tools
- Suggest corrections
- Review tools
- Rate tools
- Create collections
- Discuss tools
- Report inaccurate information

## 4.6 AI-native

AI should improve discovery and classification, but AI-generated information must not automatically become trusted fact.

AI can assist with:

- Classification
- Tag suggestions
- Semantic search
- Similarity
- Summaries
- Duplicate detection
- Recommendations

Human/community verification remains important.

## 4.7 Sustainable

Avoid business models that destroy trust.

Sponsored listings must be clearly labelled.

Paid placement should never silently manipulate organic ranking.

---

# 5. Target Users

## Primary users

### AI beginners

People looking for useful AI tools without knowing what exists.

### AI enthusiasts

People who constantly explore new AI products and projects.

### Developers

People looking for:

- APIs
- SDKs
- AI infrastructure
- open-source projects
- local AI
- models
- agents
- frameworks
- developer tools

### Creators

People looking for:

- image tools
- video tools
- audio tools
- writing tools
- design tools
- productivity tools

### Businesses

People looking for:

- automation
- customer support
- sales
- marketing
- analytics
- enterprise AI
- workflow tools

### Researchers / students

People exploring AI projects, models, datasets, papers-related tooling, and research infrastructure.

### Open-source contributors

People searching for projects they can use, contribute to, fork, or self-host.

---

# 6. Core User Jobs

A user should be able to answer questions such as:

> "What AI tools exist for this?"

> "What's the best tool for my use case?"

> "Is there an open-source alternative?"

> "Can I self-host it?"

> "Does it have an API?"

> "Is it free?"

> "What are the alternatives?"

> "What tools are similar to this?"

> "Is this GitHub project still active?"

> "Which tools are new?"

> "Which tools are trending?"

> "What tools work locally?"

> "What tools should I consider for my AI stack?"

---

# 7. MVP Scope

The first production version should focus on the following.

## Required MVP features

### Discovery

- Homepage
- Global search
- Search results
- Categories
- Tags
- Filters
- Sorting
- Trending
- Popular
- New
- Open-source discovery
- Free/freemium/paid filters
- Self-hosted filter
- Local AI filter

### Tool profiles

Each tool should have a dedicated profile page.

### Submission

Users should eventually be able to submit a tool.

### Admin moderation

Submissions should enter a moderation workflow before becoming trusted listings.

### SEO

All public content must be crawlable and indexable.

### Responsive design

Desktop, tablet, and mobile must be first-class.

### Architecture

The system must be scalable beyond the MVP.

---

# 8. Homepage

The homepage should immediately communicate:

**ToolsTok**

**Discover the AI ecosystem.**

Primary search:

> Search AI tools, projects, models, agents...

Supporting discovery paths:

- Trending
- New
- Open Source
- Free
- Self-hosted
- AI Coding
- AI Agents
- AI Automation
- AI Image
- AI Video
- Local AI
- Developer Tools

The homepage should not become overloaded with cards.

Prioritize:

1. Search
2. Discovery
3. Categories
4. Curated/trending resources
5. Trust signals

---

# 9. Global Search

Search is one of the most important parts of ToolsTok.

## Basic search

Users can search:

- Tool names
- Companies
- Categories
- Tags
- Descriptions
- GitHub repositories
- Use cases

## Future semantic search

Users should eventually be able to ask:

> "Find me an open-source alternative to Cursor that runs locally."

> "I need a free AI video tool for short videos."

> "Show me self-hosted alternatives to ChatGPT."

> "What AI coding tools have APIs?"

Semantic search should return structured, explainable results.

Do not build an opaque recommendation system that cannot explain why a result appeared.

---

# 10. Search Filters

Initial filters should include:

## Resource type

- Tool
- Application
- Project

Future:

- Model
- Agent
- MCP Server
- Workflow
- Skill
- Dataset
- API
- SDK
- Framework
- Infrastructure

## Access

- Free
- Freemium
- Paid
- Free trial
- Open source

## Deployment

- Cloud
- Self-hosted
- Local
- Browser
- Desktop
- Mobile
- API

## Technical

- API
- SDK
- GitHub
- Docker
- MCP
- RAG
- Multimodal
- LLM
- Computer Vision
- Speech

## Platform

- Web
- Windows
- macOS
- Linux
- Android
- iOS

---

# 11. Initial Categories

Categories must be stored in the database/configuration rather than hard-coded into UI components.

Initial taxonomy:

- AI Assistants
- AI Chatbots
- AI Agents
- AI Coding
- AI IDEs
- AI App Builders
- AI Automation
- AI Search
- AI Research
- AI Writing
- AI Marketing
- AI SEO
- AI Sales
- AI Productivity
- AI Design
- AI Image
- AI Video
- AI Audio
- AI Voice
- AI Music
- AI 3D
- AI Presentation
- AI Education
- AI Healthcare
- AI Finance
- AI Legal
- AI Customer Support
- AI Data & Analytics
- AI Developer Infrastructure
- LLM Infrastructure
- Model Serving
- RAG
- Vector Databases
- AI Evaluation
- AI Observability
- AI Security
- AI Privacy
- Local AI
- Open Models
- AI Hardware
- Robotics
- Computer Vision
- Speech
- Multimodal AI

Taxonomy must remain extensible.

---

# 12. Tool Profile

Every tool should have a structured profile.

## Basic fields

- Name
- Slug
- Logo
- Short description
- Long description
- Website
- Documentation
- GitHub repository
- Company/creator
- Category
- Subcategory
- Tags
- Use cases

## Commercial information

- Pricing model
- Free tier
- Free trial
- Paid plans
- Enterprise availability
- Pricing URL
- Pricing verification timestamp

## Technical information

- API
- SDK
- Integrations
- Platforms
- Deployment options
- Self-hosting
- Local support
- Docker
- MCP
- Open-source status
- License
- Repository

## Activity information

- First discovered
- Last verified
- Last updated
- Last GitHub activity
- Latest release
- Project health

## Trust information

- Verification status
- Verification source
- Verification date
- Community reports
- Data freshness

---

# 13. Tool Profile UX

A profile should roughly contain:

1. Tool identity
2. Description
3. Primary action
4. Website
5. GitHub / documentation
6. Key attributes
7. Use cases
8. Features
9. Pricing
10. Platforms
11. Open-source/license information
12. Project activity
13. Alternatives
14. Similar tools
15. Reviews
16. Community discussion
17. Related resources

Avoid making every section mandatory.

A small, trustworthy profile is better than a giant page filled with empty fields.

---

# 14. Open Source Verification

This is a critical feature.

Do not use a single boolean:

```text
is_open_source = true
```

Instead model the actual state.

Possible statuses:

- Open Source
- Source Available
- Open Weight
- Proprietary
- Unknown

Store:

- License
- Repository URL
- License URL/source
- Verification date
- Verification method
- Repository status

Examples of licenses:

- MIT
- Apache-2.0
- GPL-3.0
- AGPL-3.0
- BSD
- MPL
- Other
- Custom
- Unknown

The UI should make distinctions clear.

---

# 15. GitHub Integration

GitHub-backed projects should receive additional intelligence.

Collect where permitted and technically appropriate:

- Stars
- Forks
- Contributors
- Open issues
- Releases
- Latest release
- Last commit
- Repository creation date
- Repository language
- Topics
- License
- README
- Activity trends

Do not claim a project is healthy solely because it has many stars.

---

# 16. Project Health

ToolsTok can eventually calculate a transparent project-health indicator.

Possible inputs:

- Recent commits
- Release frequency
- Contributor activity
- Issue activity
- Pull requests
- Repository archival state
- Release recency
- Community activity

Example:

**Project status: Active**

With a tooltip:

> Based on recent repository activity, releases, and contributor signals.

Avoid presenting the score as absolute truth.

---

# 17. Alternatives Engine

Every mature listing should support:

### Alternatives

- Similar tools
- Open-source alternatives
- Free alternatives
- Self-hosted alternatives
- Local alternatives

Relationships should be stored explicitly.

Example:

```text
Tool A
  ├── alternative_to → Tool B
  ├── similar_to → Tool C
  ├── open_source_alternative_to → Tool D
  └── integrates_with → Tool E
```

This relationship graph becomes strategically important later.

---

# 18. Compare Feature

Users should eventually be able to select multiple resources.

Example:

**Compare**

- Cursor
- Windsurf
- Zed
- Continue

Comparison fields:

- Price
- Free tier
- Open source
- License
- Self-hosted
- Local
- API
- Platform
- GitHub
- Features
- Integrations
- Project activity

Comparisons must be based on structured data wherever possible.

---

# 19. Community

Eventually users can:

- Create accounts
- Review tools
- Rate tools
- Comment
- Submit tools
- Report incorrect information
- Suggest edits
- Follow tools
- Follow categories
- Create collections

Avoid creating a social network for its own sake.

Community features must improve discovery and information quality.

---

# 20. Collections

Users can create shareable collections.

Examples:

- My AI Coding Stack
- Best Open-Source AI Tools
- AI Tools for Students
- My Local AI Stack
- AI Marketing Stack
- AI Research Stack

Collections should have public URLs.

Example:

```text
/collections/open-source-ai-stack
```

---

# 21. Tool Submission Workflow

Initial workflow:

```text
User submission
      ↓
Validation
      ↓
Duplicate detection
      ↓
Moderation
      ↓
Verification
      ↓
Published
```

Possible statuses:

- Draft
- Submitted
- Needs review
- Approved
- Published
- Rejected
- Archived

Submission forms should prevent obvious spam.

---

# 22. Duplicate Detection

Before publishing a new tool:

Check:

- Exact domain
- GitHub repository
- Name similarity
- Description similarity
- Company
- Existing relationships

AI-assisted duplicate detection can help, but final moderation should remain possible.

---

# 23. Reporting

Users should be able to report:

- Dead website
- Wrong pricing
- Wrong license
- Wrong category
- Incorrect description
- Duplicate
- Misleading information
- Abandoned project
- Spam
- Other

Reports should enter an admin workflow.

---

# 24. Data Freshness

Every important dynamic field should have a freshness concept.

Examples:

```text
Pricing verified: 12 days ago
GitHub synced: 4 hours ago
Website checked: 2 days ago
License verified: 15 days ago
```

Avoid silently presenting old data as current.

---

# 25. Automated Ingestion

The platform should eventually support ingestion pipelines.

Potential sources:

- GitHub
- Official websites
- Official documentation
- Public APIs
- RSS feeds
- Structured submissions

Do not scrape indiscriminately.

Respect:

- robots.txt where applicable
- API terms
- website terms
- copyright
- rate limits
- attribution requirements

Prefer official APIs and first-party sources.

---

# 26. Background Jobs

Do not perform heavy ingestion inside normal HTTP requests.

Background jobs should handle:

- GitHub synchronization
- Link checking
- Website availability
- Metadata extraction
- Duplicate detection
- Embedding generation
- Search indexing
- Verification
- Project-health calculation
- Data refresh
- Notifications

The system should be designed so these jobs can scale independently.

---

# 27. Recommended Initial Tech Stack

## Frontend

- Next.js 16+
- TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- Radix UI where appropriate

## Backend

Initially:

- Next.js server-side functionality
- API routes / route handlers
- PostgreSQL

## Database

Recommended:

- PostgreSQL
- Supabase for initial infrastructure if convenient

## Search

Initial:

- PostgreSQL full-text search
- pgvector

Later, if scale requires:

- Meilisearch
- Typesense
- OpenSearch
- another dedicated search engine

Do not prematurely introduce complex infrastructure.

## Authentication

Potential:

- Email/password
- Google
- GitHub

Use a mature authentication solution.

## Storage

- S3-compatible object storage
- Supabase Storage initially if appropriate

## Deployment

Initially:

- Vercel for web application
- Managed PostgreSQL/Supabase

Background workers can later move to dedicated infrastructure.

---

# 28. Architecture Principles

The architecture must be:

- Modular
- Typed
- Testable
- Observable
- Secure
- Maintainable
- Scalable

Avoid:

- Giant components
- Giant API handlers
- Business logic inside UI
- Hard-coded categories
- Hard-coded tool lists
- duplicated schemas
- unnecessary dependencies
- unnecessary microservices

Start as a well-structured modular monolith.

Move services out only when scale or operational requirements justify it.

---

# 29. Suggested Repository Structure

A possible structure:

```text
toolstok/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── tools/
│   │   ├── categories/
│   │   ├── collections/
│   │   ├── compare/
│   │   └── search/
│   ├── api/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── tools/
│   ├── search/
│   ├── categories/
│   ├── collections/
│   ├── compare/
│   └── shared/
│
├── lib/
│   ├── db/
│   ├── search/
│   ├── github/
│   ├── verification/
│   ├── ingestion/
│   ├── ranking/
│   ├── embeddings/
│   └── utils/
│
├── types/
├── config/
├── content/
├── scripts/
├── workers/
├── tests/
├── public/
├── docs/
├── prisma/ or database/
├── PROJECT_DETAILS.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── SECURITY.md
```

The exact ORM/database tooling can be selected during implementation.

---

# 30. Core Database Entities

The initial schema should anticipate future growth.

Suggested entities:

```text
users
tools
companies
repositories
categories
tags
tool_categories
tool_tags
use_cases
tool_use_cases
licenses
pricing_plans
platforms
tool_platforms
integrations
tool_integrations
tool_relations
reviews
ratings
comments
collections
collection_items
submissions
claims
reports
verification_records
github_metrics
tool_metrics
search_queries
notifications
```

Future entities:

```text
models
agents
mcp_servers
workflows
skills
datasets
apis
sdks
frameworks
```

---

# 31. Slug Strategy

Public URLs must use stable slugs.

Example:

```text
/tools/chatgpt
/tools/claude
/tools/ollama
```

Slugs should be:

- lowercase
- readable
- unique
- stable

If a name changes, preserve redirects.

Never casually break existing URLs.

---

# 32. SEO

SEO is a core product requirement.

Every public resource should have:

- Unique title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- Structured data
- Breadcrumbs
- Internal links

Potential structured data:

- SoftwareApplication
- Organization
- Review
- AggregateRating
- ItemList
- BreadcrumbList

Do not generate thousands of low-quality pages solely for SEO.

Content quality comes first.

---

# 33. SEO URL Architecture

Examples:

```text
/
/tools
/tools/ollama
/tools/ollama/alternatives
/categories/ai-coding
/categories/local-ai
/categories/open-source-ai
/compare/ollama-vs-lm-studio
/collections/open-source-ai-stack
/search?q=...
```

Future:

```text
/models/...
/agents/...
/mcp/...
/workflows/...
/datasets/...
```

---

# 34. Internal Linking

Tool pages should link to:

- Category
- Tags
- Alternatives
- Similar tools
- Company
- GitHub
- Collections
- Comparisons
- Related resources

This should create a connected ecosystem rather than isolated pages.

---

# 35. Ranking Philosophy

Search and discovery rankings should consider multiple signals.

Potential signals:

- Relevance
- Data quality
- Verification
- Freshness
- Community engagement
- Usage signals where available
- Popularity
- GitHub activity
- User ratings

Do NOT make:

```text
payment = ranking
```

Paid promotion must be clearly separated from organic ranking.

Ranking logic should be documented at a high level.

---

# 36. Trending

Trending should not simply mean "most viewed."

Potential signals:

- Recent growth
- Search growth
- Saves
- Clicks
- Community activity
- GitHub growth
- Recent launches
- Recent updates

The algorithm should have protections against obvious manipulation.

---

# 37. New Tools

A new resource section should show recently added or discovered resources.

Potential metadata:

- Added date
- Launch date if known
- First verification date
- Source

Do not confuse:

**Recently added to ToolsTok**

with

**Recently launched**

unless launch date has been verified.

---

# 38. Tool Status

Possible states:

- Active
- Beta
- Deprecated
- Archived
- Discontinued
- Unknown

Status must be evidence-based.

---

# 39. Security

Security must be treated as a first-class concern.

Required practices:

- Validate all input
- Sanitize user-generated content
- Rate-limit public submission endpoints
- Protect admin routes
- Secure authentication
- Use server-side authorization
- Avoid exposing secrets
- Validate external URLs
- Protect against SSRF where URL fetching exists
- Prevent abuse of crawlers
- Add audit logs for administrative changes
- Use environment variables for secrets
- Never expose API keys to the client

---

# 40. Admin System

Admin functionality should eventually include:

### Dashboard

- Pending submissions
- Reports
- Verification failures
- Broken links
- Duplicate candidates
- Data freshness
- System health

### Tool management

- Create
- Edit
- Verify
- Archive
- Merge duplicates
- Manage categories
- Manage tags
- Manage relationships

### Moderation

- Review submissions
- Review reports
- Suspend users
- Remove spam
- Audit changes

---

# 41. Observability

Production systems need visibility.

Track:

- Errors
- API latency
- Search latency
- Database performance
- Job failures
- Queue depth
- External API failures
- Crawl failures
- Authentication failures

Use appropriate monitoring tools when the project reaches production scale.

---

# 42. Caching

Use caching strategically.

Potential cache targets:

- Popular categories
- Trending tools
- Tool profiles
- Search results
- GitHub metadata
- Public collections

Do not cache user-specific or permission-sensitive data incorrectly.

---

# 43. Rate Limiting

Rate-limit:

- Search abuse
- Submission
- Login
- Reviews
- Comments
- API requests
- Crawling
- AI operations

Limits should be configurable.

---

# 44. API

ToolsTok should eventually provide a public API.

Potential endpoints:

```text
GET /api/v1/tools
GET /api/v1/tools/{slug}
GET /api/v1/search
GET /api/v1/categories
GET /api/v1/tags
GET /api/v1/alternatives/{slug}
GET /api/v1/collections/{slug}
```

Later:

```text
GET /api/v1/models
GET /api/v1/agents
GET /api/v1/mcp
GET /api/v1/workflows
```

API versioning should be considered from the beginning.

---

# 45. Public Data

A long-term objective is to make structured AI ecosystem data useful to developers.

Potential future offerings:

- Public datasets
- JSON exports
- API
- Bulk data
- Developer SDK
- CLI

Licensing and provenance must be handled carefully.

---

# 46. AI Features

AI should be used where it genuinely improves the product.

Potential capabilities:

### Classification

Suggest:

- Categories
- Tags
- Use cases
- Resource type

### Semantic search

Understand natural language intent.

### Similarity

Find similar tools.

### Duplicate detection

Identify likely duplicate submissions.

### Summarization

Create concise descriptions from trusted sources.

### Recommendations

Recommend tools based on explicit user needs.

### Data extraction

Extract structured metadata from permitted sources.

Every AI-derived field should have an appropriate confidence/provenance model.

---

# 47. AI Trust Rules

AI-generated information must never automatically become authoritative.

Recommended internal metadata:

```text
source
source_type
extracted_at
verified_at
verification_status
confidence
generated_by
```

Where possible, show users where important information came from.

---

# 48. Internationalization

The application should be architected so localization can be added without rebuilding the product.

Do not hard-code user-facing strings throughout components.

Potential future languages can be added later.

English should be the initial default unless project requirements change.

---

# 49. Accessibility

Follow modern accessibility standards.

Requirements:

- Keyboard navigation
- Semantic HTML
- Accessible forms
- Visible focus states
- Screen-reader support
- Good contrast
- Proper labels
- Reduced-motion consideration
- Accessible dialogs
- Accessible navigation

Do not sacrifice accessibility for visual effects.

---

# 50. Design Direction

The visual identity should be:

- Modern
- Minimal
- Professional
- Clean
- Technical
- Trustworthy
- Fast
- Community-oriented

Avoid:

- Excessive gradients
- Overly futuristic visuals
- AI-slop aesthetics
- Excessive glassmorphism
- Huge animated backgrounds
- Excessive neon colors
- Crowded dashboards
- Unnecessary decorative elements

The interface should feel like serious infrastructure for discovering software.

---

# 51. Responsive Design

Mobile is not an afterthought.

Required:

- Mobile navigation
- Responsive search
- Responsive cards
- Filter drawer on mobile
- Touch-friendly controls
- Responsive comparison tables
- Fast page loads

Desktop should take advantage of larger screens without breaking mobile UX.

---

# 52. Performance

Performance is a product feature.

Prioritize:

- Server rendering where useful
- Minimal client JavaScript
- Optimized images
- Lazy loading
- Pagination
- Efficient database queries
- Search indexes
- Caching
- Avoid unnecessary hydration

Do not load an entire directory into the browser.

---

# 53. Pagination

Large datasets must use pagination or another scalable retrieval method.

Never query all tools and render them at once.

Potential approaches:

- Cursor pagination
- Offset pagination for smaller datasets

Cursor pagination is preferable for very large dynamic lists.

---

# 54. Images and Logos

Tool logos should be handled consistently.

Potential sources:

- Official brand assets
- Repository assets
- User-provided assets where permitted

Do not automatically download random copyrighted images.

Store source/provenance where appropriate.

Optimize images before serving.

---

# 55. Legal / Licensing

Because ToolsTok is open source:

The repository needs:

- LICENSE
- CONTRIBUTING.md
- SECURITY.md
- CODE_OF_CONDUCT.md
- README.md

Third-party data must be handled according to applicable licenses and terms.

Do not copy entire proprietary website content into ToolsTok.

Prefer:

- Facts
- Structured metadata
- Short descriptions
- Links
- First-party source references

---

# 56. Open-Source Governance

Initially the project can be maintained by the founding team.

As contributors grow, consider:

- Maintainers
- Code owners
- Contribution guidelines
- Issue templates
- Feature request templates
- Security disclosure process
- Release process

Major architectural changes should be documented.

---

# 57. GitHub Repository

Repository should contain:

```text
README.md
PROJECT_DETAILS.md
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
LICENSE
CHANGELOG.md
```

Potential directories:

```text
.github/
  ISSUE_TEMPLATE/
  workflows/
```

---

# 58. Environment Variables

Secrets and configuration must be environment-based.

Example categories:

```text
DATABASE_URL
DIRECT_URL
AUTH_SECRET
GITHUB_TOKEN
OPENAI_API_KEY
SEARCH_API_KEY
STORAGE credentials
```

Never commit secrets.

Provide:

```text
.env.example
```

with placeholder values only.

---

# 59. Testing

Required testing strategy:

## Unit tests

For:

- utility functions
- ranking
- parsing
- validation
- classification logic

## Integration tests

For:

- database operations
- API endpoints
- authentication
- submission workflows

## End-to-end tests

For:

- search
- tool discovery
- tool profile
- submission
- authentication
- admin moderation

Critical flows should have automated tests before production.

---

# 60. CI/CD

GitHub Actions or equivalent should eventually run:

- Type checking
- Linting
- Unit tests
- Integration tests
- Build
- Security checks

Pull requests should not merge when required checks fail.

---

# 61. Development Rules for AI Coding Agents

Any AI coding agent working on ToolsTok MUST:

1. Read `PROJECT_DETAILS.md` before making architectural changes.
2. Inspect the existing code before creating new code.
3. Reuse existing components/utilities where appropriate.
4. Avoid unnecessary dependencies.
5. Keep TypeScript strict.
6. Do not hard-code production data into components.
7. Do not create fake APIs.
8. Do not claim a feature works unless it actually works.
9. Do not remove existing functionality without a reason.
10. Keep responsive behavior in mind.
11. Consider accessibility.
12. Consider SEO for public pages.
13. Consider database scalability.
14. Validate user input.
15. Never expose secrets.
16. Run lint/typecheck/tests/build where appropriate after changes.
17. Document important architectural decisions.
18. Prefer simple solutions before introducing infrastructure complexity.
19. Never silently change the product positioning.
20. Treat this document as the product baseline, but update it when major decisions are officially changed.

---

# 62. Anti-Patterns

Do NOT build ToolsTok as:

### A giant static JSON file

The directory must eventually support millions of records and relationships.

### A collection of manually coded pages

Pages should be data-driven.

### An SEO spam engine

Quality over page count.

### An affiliate farm

Monetization must not compromise trust.

### An AI-generated content farm

AI assists the platform; it does not replace verification.

### A social network clone

Community exists to improve discovery and data quality.

### A microservice maze

Start with a modular monolith.

### A hard-coded taxonomy

Categories must evolve.

### A "blue checkbox" open-source system

Open-source claims require actual license/repository evidence.

---

# 63. Initial Product Roadmap

## Phase 0 — Foundation

- Project setup
- Repository
- Database
- Design system
- Authentication architecture
- Core schema
- SEO architecture
- Documentation

## Phase 1 — MVP Directory

- Homepage
- Search
- Categories
- Tags
- Filters
- Tool profiles
- Tool submission
- Admin moderation
- SEO
- Responsive UI

## Phase 2 — Trust & Community

- Reviews
- Ratings
- Reports
- Verification
- GitHub integration
- Data freshness
- Project health
- Collections

## Phase 3 — Discovery Intelligence

- Semantic search
- Similarity
- Alternatives
- Compare
- AI recommendations
- Duplicate detection
- Better ranking

## Phase 4 — AI Ecosystem Expansion

- Models
- Agents
- MCP servers
- Workflows
- Skills
- Datasets
- APIs
- SDKs
- Frameworks

## Phase 5 — Platform

- Public API
- Developer SDK
- CLI
- Browser extension
- Public datasets
- Community integrations
- Advanced analytics

---

# 64. Future Browser Extension

Potential features:

When a user visits an AI tool website:

- Identify whether it is already listed
- Show ToolsTok information
- Pricing
- Open-source status
- Alternatives
- Similar tools
- Reviews
- Save to collection
- Submit tool

This should be considered after the core platform is stable.

---

# 65. Future CLI

Potential:

```bash
toolstok search "local AI coding"
toolstok find ollama
toolstok alternatives cursor
toolstok compare claude chatgpt
```

This becomes possible once the public API exists.

---

# 66. Future Integrations

Potential integrations:

- GitHub
- Discord
- Slack
- Reddit where appropriate
- RSS
- Browser extension
- MCP
- Developer tooling

Integrations should always improve discovery rather than become distractions.

---

# 67. Metrics

Product analytics should focus on useful discovery.

Track:

- Search queries
- Search success
- Tool profile views
- External clicks
- Saves
- Collections
- Submissions
- Search-to-click rate
- Search-to-save rate
- Broken listing reports
- Verification turnaround
- Returning users

Do not optimize only for page views.

---

# 68. North Star Metric

A useful long-term metric:

> **Successful AI discoveries**

A discovery can mean a user searches, explores a resource, and takes a meaningful action such as:

- visiting the tool
- saving it
- adding it to a collection
- comparing it
- sharing it

The exact metric definition can evolve.

---

# 69. Data Quality Metrics

Track:

- Percentage of verified listings
- Percentage with current pricing
- Percentage with valid URLs
- Percentage with valid licenses
- Duplicate rate
- Stale listing rate
- Broken link rate
- Report resolution time

Data quality should be treated as a core product metric.

---

# 70. Monetization — Future Only

Possible models:

### Sponsored launches

Clearly labelled.

### Creator Pro

Enhanced profile and analytics.

### API

Free tier + paid usage.

### Enterprise data

Structured AI ecosystem data/API.

### Premium analytics

Trend and market intelligence.

Do not launch monetization before the product has meaningful trust and usage.

---

# 71. Brand Rules

The name is:

**ToolsTok**

Use exact capitalization.

Do not randomly rename the platform to:

- Tools Talk
- ToolTok
- AI ToolsTok
- ToolsTalk

unless the product owner explicitly changes the brand.

The brand should remain independent from any single AI company.

Do not make the identity look like it belongs to OpenAI, Anthropic, Google, Meta, Microsoft, or another vendor.

---

# 72. Competitive Positioning

ToolsTok may overlap with:

- AI directories
- Product Hunt
- GitHub
- AI search engines
- software directories

But it should differentiate through:

1. Open-source platform
2. Structured AI ecosystem data
3. Strong open-source/self-hosted discovery
4. Trust and verification
5. Alternatives
6. Comparisons
7. Community contributions
8. AI-native search
9. Extensible resource model
10. Eventually, public API/data

Do not copy competitors' UI or branding.

---

# 73. What "Scalable" Means for ToolsTok

Scalability is not just server capacity.

The architecture must scale in:

### Data

From:

```text
100 tools
```

to:

```text
10,000+
```

and eventually potentially:

```text
100,000+
```

resources.

### Users

From a small community to large public traffic.

### Search

From basic keyword search to semantic discovery.

### Resource types

From tools to the broader AI ecosystem.

### Contributors

From one maintainer to a global open-source community.

### Infrastructure

From a modular monolith to independently scalable workers/services if necessary.

---

# 74. MVP Data Example

A conceptual tool record:

```json
{
  "name": "Example AI Tool",
  "slug": "example-ai-tool",
  "resourceType": "tool",
  "shortDescription": "A concise description.",
  "websiteUrl": "https://example.com",
  "githubUrl": "https://github.com/example/project",
  "pricingModel": "freemium",
  "openSourceStatus": "open_source",
  "license": "MIT",
  "selfHosted": true,
  "local": true,
  "apiAvailable": true,
  "categories": [
    "AI Developer Infrastructure"
  ],
  "tags": [
    "local-ai",
    "developer-tools"
  ],
  "verificationStatus": "verified"
}
```

This is illustrative only.

Do not use fake production listings.

---

# 75. Recommended First Milestone

Before building advanced AI functionality, complete:

```text
[ ] Repository initialized
[ ] Next.js application initialized
[ ] TypeScript configured
[ ] Tailwind configured
[ ] UI system configured
[ ] Database configured
[ ] Core schema designed
[ ] Seed strategy designed
[ ] Homepage
[ ] Search UI
[ ] Tool listing
[ ] Tool profile
[ ] Category pages
[ ] Filters
[ ] SEO
[ ] Responsive design
[ ] Error/loading/empty states
[ ] README
[ ] PROJECT_DETAILS.md
```

Only after this foundation should advanced ingestion and AI features be added.

---

# 76. Definition of Done

A feature is not complete merely because the UI exists.

A feature is complete when:

- UI works
- Mobile works
- Data model supports it
- API/backend works where required
- Loading state exists
- Empty state exists
- Error handling exists
- Validation exists
- Accessibility is considered
- SEO is handled when public
- Tests exist for important behavior
- Build passes
- Documentation is updated when needed

---

# 77. Decision-Making Rule

When requirements conflict, prioritize:

1. User value
2. Trust/data quality
3. Security
4. Maintainability
5. Performance
6. Scalability
7. Simplicity
8. Visual polish

Do not sacrifice correctness merely to ship a flashy feature.

---

# 78. Immediate Build Order

The recommended implementation order is:

### Step 1

Initialize repository and application.

### Step 2

Establish architecture and coding conventions.

### Step 3

Create database schema.

### Step 4

Create design system.

### Step 5

Build public shell/navigation.

### Step 6

Build homepage.

### Step 7

Build directory and search.

### Step 8

Build categories and filtering.

### Step 9

Build dynamic tool profiles.

### Step 10

Build admin/data management foundation.

### Step 11

Add submission workflow.

### Step 12

Add verification architecture.

### Step 13

Add GitHub integration.

### Step 14

Add SEO and structured data.

### Step 15

Add tests and production hardening.

### Step 16

Add semantic search and recommendation features.

---

# 79. Final Product Statement

ToolsTok is being built as:

> **An open-source, community-powered platform for discovering the AI ecosystem.**

The first version focuses on **AI tools**.

The architecture is intentionally designed to grow into a broader structured ecosystem covering:

**Tools → Models → Agents → MCP → Workflows → Skills → Datasets → APIs → Infrastructure**

The goal is not to create the biggest list.

The goal is to create one of the **most useful, trustworthy, structured, and developer-friendly places to discover what is happening across the AI ecosystem.**

---

# 80. Instruction to Future AI Agents

If you are an AI coding agent reading this document:

**Do not start coding blindly.**

First:

1. Read this entire document.
2. Inspect the existing repository.
3. Identify what has already been implemented.
4. Compare implementation against this specification.
5. Preserve working functionality.
6. Identify the smallest correct next step.
7. Implement it cleanly.
8. Test it.
9. Run the production build where appropriate.
10. Report exactly what changed and any remaining issues.

Do not invent requirements.

Do not silently change product direction.

Do not add unnecessary complexity.

When a major product or architecture decision changes, update this document so it remains the source of truth.

---

**ToolsTok**

**Discover the AI ecosystem.**
