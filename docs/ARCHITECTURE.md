# Nex Architecture

Frontend:
- Next.js
- TypeScript
- Tailwind
- shadcn/ui

Backend:
- Next.js API Routes

Flow:
User Input -> AI Service -> Platform Formatter -> Output

V1 has no database.

---

## Implemented module layout (V1)

```
app/
  page.tsx                    Landing (hero, how it works, examples, CTA)
  generate/page.tsx           Create Content page
  results/page.tsx            Results page (tabs, copy, regenerate)
  about/page.tsx              About page
  api/generate/route.ts       POST /api/generate — validates, calls AI, returns ContentResponse
  layout.tsx                  Root layout (Inter font, header, footer)

components/
  ui/                         shadcn/ui primitives
  generate/content-form.tsx   Topic/Audience/Tone form (React Hook Form + Zod)
  results/results-view.tsx    Tabs + regenerate; reads stored generation
  results/copy-button.tsx     Copy-to-clipboard with feedback
  site-header.tsx             Responsive nav (Sheet on mobile)
  site-footer.tsx
  fade-in.tsx                 Framer Motion entrance (respects reduced motion)

lib/
  ai/provider.ts              Provider abstraction; OpenAI-compatible; mock fallback
  ai/prompts.ts               System + user prompts (JSON output contract)
  ai/mock.ts                  Zero-setup mock generator (no API key required)
  formatters/{linkedin,x,reddit,text}.ts   Platform-native post-processing
  validation.ts               Zod schemas for every trust boundary
  storage.ts                  sessionStorage persistence (validated on read)

hooks/
  use-generate-content.ts     Client API call + loading/error state
  use-copy-to-clipboard.ts

types/
  content.ts                  ContentRequest, ContentResponse, PlatformContent, Tone
```

## Data flow

1. `ContentForm` validates input client-side (Zod via React Hook Form).
2. `POST /api/generate` re-validates server-side (never trust the client).
3. `lib/ai/provider.ts` calls the model (one call returns all three platforms as JSON)
   or the mock generator when `OPENAI_API_KEY` is absent.
4. Model output is Zod-parsed, then passed through platform formatters.
5. The response is stored in `sessionStorage` and rendered on `/results`.
   Reads from storage are re-validated — storage is treated as untrusted input.

## Security boundaries

- API keys are server-side only (route handler → provider). Nothing secret ships to the client.
- All AI output is rendered as plain text (`whitespace-pre-wrap`), never as HTML.
- Error responses expose no provider internals.
