# Cryptic Cinema Backend

Backend API scaffold for `crypticcinema.com`, built so you can ship frontend UI/UX independently against a stable API.

## Stack

- FastAPI
- SQLAlchemy 2.0
- SQLite by default (switchable via env var)

## Quickstart

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
```

API docs: `http://127.0.0.1:8000/docs`

## Configuration

Environment variables are prefixed with `CRYPTIC_`.

- `CRYPTIC_DATABASE_URL` (default: `sqlite:///./crypticcinema.db`)
- `CRYPTIC_APP_NAME` (default: `Cryptic Cinema API`)
- `CRYPTIC_ENV` (default: `dev`)
- `CRYPTIC_CORS_ORIGINS` (default: `*`)
- `CRYPTIC_JWT_SECRET_KEY` (change in production)
- `CRYPTIC_JWT_ALGORITHM` (default: `HS256`)
- `CRYPTIC_ACCESS_TOKEN_EXPIRE_MINUTES` (default: `60`)

Copy `.env.example` to `.env` to override defaults locally.

## Initial API Surface

- `GET /v1/health`
- `POST /v1/auth/register`
- `POST /v1/auth/token`
- `GET /v1/auth/me`
- `POST /v1/titles`
- `GET /v1/titles`
- `GET /v1/titles/{title_id}`
- `GET /v1/titles/by-slug/{slug}`
- `PATCH /v1/titles/{title_id}`
- `DELETE /v1/titles/{title_id}`
- `POST /v1/collections`
- `GET /v1/collections`
- `GET /v1/collections/{collection_id}`
- `GET /v1/collections/by-slug/{slug}`
- `POST /v1/collections/{collection_id}/titles`
- `DELETE /v1/collections/{collection_id}/titles/{title_id}`
- `GET /v1/me/title-states`
- `PUT /v1/me/title-states/{title_id}`
- `DELETE /v1/me/title-states/{title_id}`

This gives you a usable backend foundation for catalog + curated lists while keeping the data model flexible for future features (accounts, ratings, watch history, editorial content).

## Tests

```bash
pytest -q
```

## Deploying to Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/crypticcinema-api
gcloud run deploy crypticcinema-api \
  --image gcr.io/PROJECT_ID/crypticcinema-api \
  --platform managed \
  --allow-unauthenticated \
  --region us-central1
```

Set runtime env vars in Cloud Run: `CRYPTIC_DATABASE_URL`, `CRYPTIC_JWT_SECRET_KEY`, and `CRYPTIC_CORS_ORIGINS`.

## Launch + Monetization Checklist

See `/docs/google-launch-playbook.md` for AdSense, SEO, and GEO requirements.
