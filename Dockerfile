FROM node:20.18.1-bookworm-slim
WORKDIR /app

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_LOGLEVEL=error
ENV npm_config_cache=/tmp/npm-cache

RUN npm install -g npm@10.8.2 --registry=https://registry.npmjs.org/ --no-audit --no-fund

COPY package*.json ./
RUN npm ci --include=dev --registry=https://registry.npmjs.org/ --no-audit --no-fund --prefer-online

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=8787
EXPOSE 8787

CMD ["node", "server.cjs"]
