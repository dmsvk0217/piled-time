# Stage 1: Build React
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: export dist only (no nginx)
FROM alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
