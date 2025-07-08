#!/bin/bash

echo "🚀 Pulling latest images from Docker Hub..."
docker compose -f docker-compose.ec2.yml pull

echo "🔁 Restarting containers..."
docker compose -f docker-compose.ec2.yml down
docker compose -f docker-compose.ec2.yml up -d

echo "✅ Deployment complete."
