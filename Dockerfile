# -------- STEP 1: Build React --------
FROM node:20 AS client-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ . 
RUN npm run build


# -------- STEP 2: Build NestJS --------
FROM node:20 AS server-build

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copy React build to Nest public folder
COPY --from=client-build /app/client/build ./public

RUN npm run build


# -------- STEP 3: Run NestJS App --------
FROM node:20

WORKDIR /app
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/node_modules ./node_modules
COPY --from=server-build /app/server/package*.json ./
COPY --from=server-build /app/server/public ./public

EXPOSE 3000

CMD ["node", "dist/main"]
