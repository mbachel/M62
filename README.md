# M62 - Generative AI Analytics Dashboard

**ITIS 5166 - Backend Application Development - Final Project**

A full-stack web application showcasing recent innovations in Generative AI with interactive data visualizations, user authentication, and a production-ready deployment pipeline.

---

## Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Ports 80, 443, and 3000 available

### Run Locally

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Start all services
docker compose up -d --build

# 3. Open in browser
# http://localhost (or https://localhost)

# 4. Log in
# Username: matthew
# Password: matthew
```

**That's it!** All three services (MongoDB, Backend, Frontend) start automatically.

---

## What's Running
| Service | Purpose | Port |
|---------|---------|------|
| **MongoDB** | Data storage for AI models and releases | 27017 (internal) |
| **Backend** (FastAPI) | REST API serving authentication & data endpoints | 3000 (internal) |
| **Frontend** (React + Nginx) | Web UI with charts and dashboards | 80/443 (public) |

**Data note:** All data is seeded from static JSON files on startup (`mongo-init/seed.sh`, `model_performances.json`, `model_releases.json` (`genai_adoption.json` is unused)). The database resets on every container restart.

---

## Development

### Local Setup (without Docker)

```bash
# Concurrently allows both backend and frontend services to run through one terminal
# MongoDB database should already be connected and seeded with JSON data
cd frontend
npm run dev
# Runs API at http://localhost:3000
# Runs frontend at http://localhost:5173
```

### Quality Checks
```bash
# Frontend lint/format/typecheck
npm run lint
npm run format
npm run typecheck

# Backend lint/format/testing
ruff check backend
ruff format --check backend
pytest backend
```

## Deployment
### One-Time Server Setup

```bash
# SSH into your (I use DigitalOcean) server
ssh deploy@your-server

# Clone repo
git clone https://github.com/mbachel/M62.git
cd M62

# Copy environment file
cp .env.example .env
# Edit .env with your JWT_SECRET and MongoDB URL
# Keep the MongoDB URL default if you plan to let it seed itself

# Test startup
docker compose up -d --build
```

### Deploy Updates

After pushing changes to `main`:

```bash
ssh deploy@your-server 'cd /home/deploy/M62 && git pull && docker compose up -d --build'
```

---

## Deployment Sanity Check

After deploying, verify everything is running:
```bash
# SSH into server
ssh deploy@your-server

#Check all services running
cd home/deploy/M62
docker compose ps

#Expected output: all services UP (not Exit)
```

### View Logs

```bash
# Real-time logs from all services
docker compose logs -f

# Tail last 50 lines
docker compose logs -n 50 -f

# Specific service
docker compose logs -f backend
```

### Restart / Rebuild

```bash
# Restart without rebuild
docker compose restart

# Full restart with code rebuild
docker compose up -d --build

# Stop all services
docker compose down
```

---

## Project Status

### What's Maintained
- ✅ Bug fixes and security updates via [Dependabot](https://dependabot.com)
- ✅ CI/CD pipeline runs on all PRs and pushes
- ✅ Production deployment via GitHub Actions

### What's NOT Maintained
- ❌ New features (this is the final project - it's complete)
- ❌ Data updates (static JSON files; no backend admin panel)
- ❌ Active development (archive expected upon graduation)

This is a project snapshot, not an actively developed product.

---

## Architecture

```
.
├── frontend/                 # React + Vite + Tailwind
│   ├── Dockerfile            # Nginx reverse proxy
│   ├── nginx.conf            # SSL + API routing
│   └── app/                  # React components & pages
├── backend/                  # Python FastAPI
│   ├── Dockerfile            # FastAPI application
│   ├── main.py               # Routes & business logic
│   ├── auth.py               # JWT authentication
│   └── tests/                # Pytest suite
├── docker-compose.yml        # Service orchestration
├── .github/workflows/        # GitHub Actions CI/CD
│   └── ci-deploy.yml         # Lint, test, deploy pipeline
└── .env.example              # Environment template
```

---

## Tech Stack

- **Frontend:** React 19, React Router, Tailwind CSS, D3.js charts, Vite
- **Backend:** Python 3.13, FastAPI, OAuth2/JWT, Pytest
- **Database:** MongoDB 8.2
- **Infrastructure:** Docker, Docker Compose, Nginx (SSL/reverse proxy)
- **CI/CD:** GitHub Actions (lint, test, deploy via SSH)
- **Tooling:** ESLint, Prettier, Ruff, Pytest, Dependabot

---

## Features

- **Model Performance Dashboard:** Compare top-tier LLMs across benchmarks
- **Release Timeline:** Track AI model releases and innovations
- **User Authentication:** Secure login with JWT tokens
- **Responsive UI:** Mobile-friendly design with theme toggle
- **Data Visualizations:** Interactive charts powered by D3.js

---

## Support & Issues

This project is no longer in active development. For questions during handoff:

1. Check the Architecture section above
2. Review `docker-compose.yml` for service configuration
3. Check `.env.example` for required environment variables
4. Review GitHub Actions workflow (`.github/workflows/ci-deploy.yml`) for deployment process

---

**Created:** Fall 2025  
**Status:** Complete (Final Project)