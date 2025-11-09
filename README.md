
# Neon ChatGPT Frontend (React + Tailwind + Vite)

A minimal ChatGPT-style frontend with a neon, flashy UI. Left sidebar fetches models
from your backend. If no selection is made, it falls back to a default model.
The chat section mimics the ChatGPT message style.

## Features
- React + Vite + Tailwind
- Neon "crazy" glassmorphism UI
- Sidebar model selector (from backend)
- Default model fallback
- Chat-like bubbles, auto-scroll to bottom
- Simple routing: `/` → Home
- Clean API layer: `GET /api/models`, `POST /api/chat`

## Expected Backend Contracts
- `GET /api/models` → `{ models: [{ id: "gpt-4o-mini", name: "GPT-4o Mini" }, ...], default: "gpt-4o-mini" }`
- `POST /api/chat` with body:
  ```json
  { "model": "gpt-4o-mini", "messages": [{ "role": "user", "content": "hello"}] }
  ```
  Response:
  ```json
  { "reply": "Hi there!" }
  ```

## Run Locally
```bash
npm i
npm run dev
```

> Tip: If your backend is on a different origin, set `baseURL` in `src/services/api.js`
> or add a Vite proxy in `vite.config.js`.

## Optional: Vite Proxy
Create `vite.config.js` if you need a proxy:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
```
