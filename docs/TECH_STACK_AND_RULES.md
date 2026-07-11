# TECH_STACK_AND_RULES.md

# Nex Technical Stack and Development Rules

## Purpose
This document defines the approved technology stack, design system, security requirements, and file modification boundaries for AI coding assistants and contributors.

---

# Approved Tech Stack

## Frontend

- Next.js 15+
- React 19+
- TypeScript 5+
- Tailwind CSS 4+
- shadcn/ui
- Lucide React

## Forms & Validation

- React Hook Form
- Zod

## Animation

- Framer Motion

## API Layer

- Next.js Route Handlers

## AI Layer

- OpenAI SDK
- OpenAI-compatible providers

## Package Manager

- pnpm

---

# Design System

## UI Components

Use shadcn/ui components whenever possible.

Required components:

- Button
- Input
- Textarea
- Tabs
- Card
- Badge
- Dialog
- Dropdown Menu
- Select
- Sheet

Do not build custom replacements unless necessary.

---

## Design Principles

- Minimal
- Modern
- Fast
- Founder-focused
- Mobile-first
- Accessible

---

## Color System

Primary:
- Black
- White

Accent:
- Emerald
- Neutral grays

Avoid:
- Excessive gradients
- Neon color palettes
- Corporate enterprise styling

---

## Typography

Font:
- Inter

Rules:
- Large readable headings
- Generous spacing
- Clear hierarchy

---

## Layout Rules

- Mobile-first
- Responsive at all breakpoints
- Maximum content width:
  1280px

Use:
- Flexbox
- CSS Grid

Avoid:
- Fixed-width layouts

---

# Security Rules

## API Keys

Never:

- Hardcode API keys
- Commit secrets
- Store credentials in source files

Always:

- Use environment variables
- Use .env.local
- Use server-side secrets only

---

## Input Validation

Validate:

- Topic
- Audience
- Tone

Use:

- Zod schemas

Reject:

- Empty requests
- Invalid payloads

---

## Output Safety

Sanitize:

- User-generated content
- Dynamic rendering inputs

Prevent:

- XSS risks
- Unsafe HTML injection

---

# Environment Variables

Required:

OPENAI_API_KEY

Optional:

OPENAI_BASE_URL
OPENAI_MODEL

Use placeholder values only in examples.

---

# Allowed File Modifications

Claude may modify:

/app
/components
/lib
/hooks
/types
/public
/docs

---

# Restricted Files

Require explicit approval before modifying:

package.json
pnpm-lock.yaml
next.config.ts
middleware.ts
vercel.json

---

# Forbidden Actions

Do not:

- Delete large sections of code
- Remove authentication logic
- Disable validation
- Disable linting
- Disable type checking
- Disable tests
- Modify deployment settings without approval

---

# Testing Requirements

Before completion:

- Run linting
- Run type checks
- Run build verification

Required commands:

pnpm lint
pnpm typecheck
pnpm build

---

# Definition of Done

A task is complete only when:

- Code compiles
- Type checks pass
- Build succeeds
- UI is responsive
- Accessibility is preserved
- Security requirements are satisfied
- Product requirements are met
