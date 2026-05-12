FROM node:20-bookworm-slim
WORKDIR /app

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_LOGLEVEL=error

COPY package*.json ./
RUN npm ci --include=dev --registry=https://registry.npmjs.org/ --no-audit --no-fund

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8787
EXPOSE 8787

CMD ["node", "server.cjs"]
