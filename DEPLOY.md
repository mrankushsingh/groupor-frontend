# Deploy: Vercel (frontend) + Railway (backend)

Two GitHub repos:

- Frontend: `groupor-frontend` → Vercel
- Backend: `groupor-backend` → Railway + PostgreSQL

```
Browser → Vercel (TanStack Start UI)
                ↓ VITE_API_URL
         Railway (FastAPI /api/*)
                ↓
         Railway PostgreSQL
```

## 1. Railway — backend (`groupor-backend`)

1. New Railway project from the **backend** GitHub repo.
2. Add **PostgreSQL**.
3. Root Directory: repo root (`.` — backend-only repo).
4. Builder: Dockerfile.
5. Variables:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Railway Postgres URL |
| `SITE_URL` | `https://YOUR-API.up.railway.app` |
| `SITE_NAME` | `Groupor` |
| `SESSION_SECRET` | Long random string |
| `CORS_ORIGINS` | `https://YOUR-APP.vercel.app` |
| `PORT` | Automatic on Railway |

6. Deploy and open `/healthz`.

API:

- `GET /api/groups`
- `GET /api/groups/{slug}`
- `POST /api/groups`
- Docs: `/api/docs`

## 2. Vercel — frontend (`groupor-frontend`)

1. Import **frontend** GitHub repo into Vercel.
2. Framework: **TanStack Start** (`vercel.json`).
3. Env:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | `https://YOUR-API.up.railway.app` (no trailing slash) |

4. Deploy.

## Domains (optional)

- Frontend: `www.groupor.link` → Vercel  
- API: `api.groupor.link` → Railway  

Update `VITE_API_URL`, `SITE_URL`, and `CORS_ORIGINS` to match.
