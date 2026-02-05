FROM node:18-alpine AS builder
WORKDIR /app

# Install root deps (if any) and client deps then build client
COPY package.json package-lock.json ./
COPY hello-world/package.json hello-world/package-lock.json ./hello-world/
RUN npm install --silent
RUN cd hello-world && npm install --silent

# Copy source and build React app
COPY . .
RUN cd hello-world && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
RUN npm ci --omit=dev --silent || true
EXPOSE 2300
CMD ["node", "server.js"]
