FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --registry=https://registry.npmjs.org/
COPY . .
RUN npm run build
EXPOSE 8787
CMD ["npm", "run", "start"]
