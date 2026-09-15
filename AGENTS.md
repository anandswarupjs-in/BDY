# Base44 Dev Environment

## Project Overview
Static single-page HTML site (birthday surprise). No build step, no backend, no dependencies.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```
Serves `index.html` and `assets/` via nginx on port 3000.

## Editing
Edit `index.html` directly — changes appear after a preview reload (nginx serves the bind-mounted source, but there is no live-reload dev server for static files).
