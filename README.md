# Nex

Open-source social media content engine for solo founders.

Turn one idea into ready-to-post content for three platforms in under 60 seconds.

**Input:** Topic · Audience · Tone

**Output:** LinkedIn post · X thread · Reddit post

## How it works

1. Enter your topic, audience, and tone on the Generate page.
2. Nex asks an OpenAI-compatible model for platform-native versions of your idea.
3. Review the results in tabs, copy what you like, regenerate what you don't.

No database, no accounts, no tracking. V1 is a single-session tool.

## Getting started

Requirements: Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # add your OPENAI_API_KEY
pnpm dev
```

Open http://localhost:3000.

**No API key?** Nex still runs — it falls back to a built-in mock generator so you can explore
the full flow. Mock output is clearly labeled in the UI.

### Environment variables

| Variable          | Required | Description                                              |
| ----------------- | -------- | -------------------------------------------------------- |
| `OPENAI_API_KEY`  | Yes*     | API key for OpenAI or any OpenAI-compatible provider.    |
| `OPENAI_BASE_URL` | No       | Alternative OpenAI-compatible endpoint.                  |
| `OPENAI_MODEL`    | No       | Model name. Defaults to `gpt-4o-mini`.                   |

*Without it the app runs in mock mode.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- React Hook Form + Zod for forms and validation
- OpenAI SDK (works with any OpenAI-compatible provider)

## Project structure

```
app/           Routes: landing, /generate, /results, /about, /api/generate
components/    UI — shadcn primitives in ui/, feature components alongside
lib/           AI provider, prompts, formatters, validation, storage
hooks/         Client hooks (generation, clipboard)
types/         Domain models (ContentRequest, ContentResponse, ...)
docs/          Product and engineering documentation
```

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

Nex deploys anywhere Next.js runs. On [Vercel](https://vercel.com), import this repo
(or use the button below), add the environment variables from the table above, and deploy —
every push to `main` then deploys automatically.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCodebySadhana%2FNex&env=OPENAI_API_KEY,OPENAI_BASE_URL,OPENAI_MODEL&envDescription=OpenAI-compatible%20provider%20credentials%20(works%20with%20OpenAI%2C%20Groq%2C%20and%20others)&project-name=nex)

To use [Groq](https://groq.com) as the provider, set:

```
OPENAI_API_KEY=gsk_...
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.3-70b-versatile
```

Without an API key the deployed app runs in clearly-labeled mock mode.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Read [docs/TECH_STACK_AND_RULES.md](docs/TECH_STACK_AND_RULES.md)
before making changes — it defines the approved stack, design system, and security rules.

## Security

Never commit secrets. All user input is validated with Zod at every trust boundary.
See [SECURITY.md](SECURITY.md).
