#!/bin/bash

# .env.production 파일에서 환경변수 로딩
source .env.production

echo "🚀 Pulling latest images from Docker Hub..."

docker pull ${DOCKER_USER}/react-nginx-app
docker pull ${DOCKER_USER}/nest-server

docker compose -f docker-compose.ec2.yml down
docker compose -f docker-compose.ec2.yml pull

echo "🔁 Restarting containers..."
docker compose -f docker-compose.ec2.yml up -d --force-recreate

echo "✅ Deployment complete."
