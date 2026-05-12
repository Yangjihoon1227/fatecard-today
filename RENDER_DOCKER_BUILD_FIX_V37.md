# v37 Render Docker build fix

Render failed at:

RUN npm install --registry=https://registry.npmjs.org/

with:

npm error Exit handler never called!

This is an npm install / Docker build-stage failure, not a React app code failure.

## Fix

Dockerfile now uses:

npm ci --include=dev --registry=https://registry.npmjs.org/ --no-audit --no-fund

instead of npm install.

Why:
- npm ci is deterministic and uses package-lock.json.
- It is more suitable for CI/Docker/Render builds.
- Dev dependencies are intentionally included because TypeScript and Vite are needed during build.
- NODE_ENV=production is set only after npm run build.

After pushing this commit, use Render → Manual Deploy → Clear build cache & deploy if Render keeps using a failed cached layer.
