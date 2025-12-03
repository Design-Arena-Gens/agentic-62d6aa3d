## Agentic Talk

Next.js single-page chat experience that keeps the conversation moving with lightweight, on-device responses. No external APIs required—everything runs in the browser.

### Prerequisites
- Node.js 18+
- npm 9+

### Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

### Project Notes
- App Router with TypeScript and strict mode.
- Responses generated client-side via `lib/responder.ts`.
- UI components live in `components/`; shared styling in `app/globals.css`.
