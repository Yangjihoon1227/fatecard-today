# v38 Render Docker build hardening

The Render deploy for v37 still failed after switching from `npm install` to `npm ci`.

The earlier log showed Node's bundled npm 10.9.7 failing with:

`npm error Exit handler never called!`

v38 pins npm to 10.8.2 inside Docker before dependency installation:

`RUN npm install -g npm@10.8.2 ...`

Then it runs:

`npm ci --include=dev ...`

This avoids relying on the problematic bundled npm version used by the base image.
