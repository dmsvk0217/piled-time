# Stage 1: Build NestJS
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run container
FROM node:20-alpine AS production

# Declare build arg and env
ARG START_SCRIPT=start:local
ENV START_SCRIPT=$START_SCRIPT

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

# Dynamic CMD
CMD ["sh", "-c", "npm run $START_SCRIPT"]
