# Contributing to ToolsTok

Thank you for your interest in contributing to **ToolsTok**.

ToolsTok is an open-source, community-powered platform for discovering, exploring, comparing, verifying, and sharing AI tools and resources.

The project is being built with a strong focus on **usefulness, structured data, transparency, trust, and long-term scalability**.

Whether you're fixing a typo, improving documentation, adding a resource, fixing a bug, improving search, or building a major feature, contributions are welcome.

---

## Before You Contribute

Please read the project documentation before making substantial changes:

- [Project Details](./docs/PROJECT_DETAILS.md)
- [README](./README.md)

The Project Details document explains the product vision, architecture, data model, roadmap, and development principles.

---

## What You Can Contribute

There are many ways to contribute to ToolsTok.

### Code

You can help with:

- Frontend development
- Backend development
- API development
- Database architecture
- Search and discovery
- Authentication and authorization
- Resource management
- Verification systems
- GitHub integrations
- Data ingestion
- Performance
- Security
- Accessibility
- Testing
- Developer tooling

### AI & Discovery

Contributions are especially useful around:

- Semantic search
- Resource recommendations
- Similarity detection
- Alternatives
- AI-powered discovery
- Resource classification
- Metadata extraction
- Ecosystem relationships
- AI resource quality signals

### Data

ToolsTok depends on high-quality ecosystem data.

You can contribute by:

- Submitting AI resources
- Correcting inaccurate information
- Improving resource metadata
- Identifying outdated information
- Verifying repositories
- Improving license information
- Reporting broken links
- Identifying duplicate resources
- Improving categories and tags

### Documentation

Documentation contributions are equally valuable.

You can improve:

- Installation instructions
- Developer documentation
- Architecture documentation
- API documentation
- Contribution guides
- Tutorials
- Examples
- Project specifications

### Design & UX

You can contribute to:

- UI/UX improvements
- Accessibility
- Responsive design
- Information architecture
- Search experience
- Resource discovery
- Comparison interfaces
- Community workflows

---

## Development Principles

Please keep these principles in mind when contributing.

### 1. Build for the ecosystem

ToolsTok is intended to become more than a simple AI tools directory.

Avoid implementations that unnecessarily limit the platform to one narrow resource type.

### 2. Prefer structured data

ToolsTok should provide meaningful structured information rather than thin pages created primarily for SEO.

### 3. Don't hardcode deployment URLs

Application URLs must come from configuration.

Use:

```env
NEXT_PUBLIC_SITE_URL=
```

instead of hardcoding production domains throughout the codebase.

### 4. Keep business logic portable

Avoid unnecessarily coupling core business logic to a single infrastructure provider.

Infrastructure-specific integrations should be isolated where practical.

### 5. Server-first by default

Public, indexable pages should remain server-rendered where appropriate.

Use client-side components when interaction actually requires them.

### 6. Avoid premature complexity

ToolsTok currently follows a **modular monolith** architecture.

Don't introduce microservices, queues, search infrastructure, or other distributed systems unless there is a clear technical reason.

### 7. Treat open-source status seriously

Do not describe a project as "open source" simply because its source code is publicly available.

ToolsTok distinguishes between:

- Open Source
- Source Available
- Open Weight
- Proprietary
- Unknown

License information and verification should be handled carefully.

### 8. Protect user trust

Avoid designs that create misleading rankings, hidden paid placement, fabricated reviews, or inaccurate resource information.

### 9. Build for accessibility

Interfaces should be usable by as many people as reasonably possible.

Consider:

- Keyboard navigation
- Semantic HTML
- Screen readers
- Color contrast
- Focus states
- Form accessibility
- Responsive layouts

### 10. Keep changes focused

A pull request should ideally solve one clearly defined problem.

Avoid mixing unrelated refactors, visual changes, dependency upgrades, and feature work in the same PR unless necessary.

---

## Local Development

### Requirements

You should have:

- Node.js
- pnpm
- PostgreSQL or a compatible PostgreSQL provider
- Git

### Install the project

```bash
git clone https://github.com/rakibulia/toolstok.git
cd toolstok
pnpm install
```

### Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure the required values in `.env.local`.

Never commit:

```text
.env
.env.local
.env.*.local
```

or any file containing secrets.

### Start development

```bash
pnpm dev
```

### Run the production build

```bash
pnpm build
```

---

## Database Development

ToolsTok uses:

- PostgreSQL
- Drizzle ORM
- Drizzle migrations

When modifying the database schema:

1. Update the appropriate schema file.
2. Review the schema change carefully.
3. Generate a migration.
4. Inspect the generated SQL.
5. Apply the migration locally or to your development database.
6. Test affected functionality.
7. Include the migration in your pull request.

Generate a migration with:

```bash
pnpm exec drizzle-kit generate
```

Apply migrations using the project's migration runner:

```bash
npx tsx .\scripts\migrate.ts
```

Do not manually modify an already-applied migration unless you understand the consequences and the change is intentionally being handled as a migration history correction.

---

## Adding an AI Resource

When adding a resource to ToolsTok, provide as much accurate information as possible.

Useful information includes:

- Name
- Description
- Website
- Documentation
- Repository
- Organization
- Resource type
- Categories
- Tags
- Pricing model
- Source model
- License
- Relevant external identifiers

### Accuracy matters

Do not guess:

- Licenses
- Open-source status
- Pricing
- Repository ownership
- Company ownership
- Project activity
- Verification status

If information cannot be verified, it should be represented as unknown rather than fabricated.

---

## Pull Request Process

### 1. Create an issue when appropriate

For significant changes, discuss the idea before implementing it.

This is especially useful for:

- Major features
- Database changes
- Architectural changes
- New dependencies
- Significant UX changes
- Changes affecting the public API

Small fixes can generally go directly into a pull request.

### 2. Create a branch

Use a descriptive branch name.

Examples:

```text
feature/semantic-search
feature/resource-comparison
fix/resource-slug-validation
fix/mobile-navigation
docs/api-guide
refactor/search-service
```

### 3. Make your changes

Keep the implementation focused and follow the existing project architecture.

### 4. Test your changes

At minimum, run:

```bash
pnpm build
```

If your change includes tests, run the relevant test suite as well.

### 5. Review your changes

Before submitting a PR:

- Check the Git diff.
- Remove debugging code.
- Remove unused imports.
- Check for accidental secrets.
- Check generated files.
- Check database migrations.
- Verify responsive behavior when changing UI.
- Verify SEO implications for public pages.

### 6. Submit the pull request

Your PR should clearly explain:

- What changed
- Why it changed
- How it was implemented
- How it was tested
- Any migration or configuration requirements

---

## Pull Request Guidelines

A good pull request should be:

- Focused
- Understandable
- Tested
- Documented where necessary
- Compatible with the existing architecture

### Example

```text
feat: add resource comparison

Adds the initial resource comparison workflow.

Changes:
- Adds comparison route
- Adds comparison query layer
- Adds comparison UI
- Adds resource comparison metadata

Testing:
- pnpm build
- Relevant tests
```

---

## Commit Messages

Use clear, descriptive commit messages.

Recommended prefixes:

```text
feat:
fix:
docs:
refactor:
test:
chore:
perf:
style:
build:
ci:
```

Examples:

```text
feat: add resource comparison
fix: validate resource URLs
docs: improve contributor guide
refactor: isolate search queries
test: add resource service tests
chore: update dependencies
```

Keep commits understandable and avoid messages such as:

```text
update
changes
fix stuff
final
final final
working
```

---

## Code Quality

When writing code:

- Prefer clear names over clever abstractions.
- Keep functions focused.
- Validate external input.
- Keep types explicit where useful.
- Reuse existing utilities before introducing duplicates.
- Keep database queries in the query layer.
- Keep business logic in services.
- Keep validation schemas centralized.
- Avoid unnecessary client components.
- Avoid unnecessary dependencies.

Security-sensitive functionality should receive additional review.

---

## Security

Never commit:

- API keys
- Database passwords
- Authentication secrets
- Access tokens
- Private credentials
- Service-role keys
- Personal data

If you accidentally expose a secret:

1. Revoke or rotate the credential immediately.
2. Remove it from the repository.
3. Check Git history if necessary.
4. Report the incident to the project maintainers.

Do not open a public issue containing an active secret.

---

## Reporting Bugs

When reporting a bug, include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Relevant error messages
- Browser/Node.js version when relevant
- Operating system when relevant
- Screenshots or logs when useful

Avoid posting passwords, API keys, tokens, or other secrets.

---

## Feature Requests

Feature requests are welcome.

A useful feature request should explain:

1. The problem
2. Who experiences the problem
3. Why it matters
4. The proposed solution
5. Possible alternatives

Focus on the underlying user problem rather than only prescribing an implementation.

---

## Data Quality & Verification

ToolsTok is intended to become a trusted discovery layer for the AI ecosystem.

Data contributions should therefore prioritize accuracy over quantity.

When verifying a resource, consider:

- Official website
- Official repository
- License
- Organization ownership
- Project activity
- Documentation
- Pricing
- Source availability
- Open-source status
- Last verification date

If a claim cannot be established reliably, don't present it as fact.

---

## Community Standards

Contributors are expected to maintain a respectful and constructive environment.

Please:

- Be respectful.
- Assume good intent.
- Focus criticism on ideas and implementations.
- Welcome newcomers.
- Avoid harassment.
- Avoid spam.
- Avoid misleading submissions.
- Respect project maintainers and other contributors.

The objective is to build useful open-source infrastructure together.

---

## License

ToolsTok is an open-source project.

The applicable project license is defined in the repository's license file.

If you are contributing code, documentation, or other material, make sure you have the right to submit it under the project's applicable license.

---

## Questions

If you're unsure about something, open an issue or start a discussion rather than making a large architectural change without context.

Small questions are welcome.

**Thank you for helping build ToolsTok.**

<div align="center">

**ToolsTok — Discover the AI ecosystem.**

</div>