# logix-auth-frontend (React + TypeScript)

Minimal, production-ready frontend for the `logix-auth` service.

## Quick Start
```bash
cp .env.example .env
npm i
npm run dev
```

- Set `VITE_API_BASE` to your backend base URL (default `http://localhost:8080/v1`).
- Login stores access token in memory; refresh happens via httpOnly cookie on the backend.
