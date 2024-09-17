#!/bin/bash

set -e

# Authenticate with Google Cloud
echo "Authenticating with Google Cloud..."
gcloud auth activate-service-account --key-file=${GCP_SERVICE_ACCOUNT_KEY}
gcloud config set project ${GCP_PROJECT_ID}

# Build and push Docker images
echo "Building and pushing Docker images..."
docker build -t gcr.io/${GCP_PROJECT_ID}/myapp:${VERSION} .
docker push gcr.io/${GCP_PROJECT_ID}/myapp:${VERSION}

# Apply Terraform configurations
echo "Applying Terraform configurations..."
cd terraform
terraform init
terraform apply -auto-approve

# Deploy to Google Kubernetes Engine
echo "Deploying to Google Kubernetes Engine..."
gcloud container clusters get-credentials ${GKE_CLUSTER_NAME} --zone ${GKE_ZONE}
kubectl apply -f k8s/

# Run database migrations
echo "Running database migrations..."
kubectl exec -it $(kubectl get pods -l app=myapp -o jsonpath="{.items[0].metadata.name}") -- python manage.py migrate

# Update environment variables
echo "Updating environment variables..."
kubectl set env deployment/myapp VERSION=${VERSION}

# Perform post-deployment checks
echo "Performing post-deployment checks..."
kubectl get pods
kubectl get services

# HUMAN ASSISTANCE NEEDED
# The following checks should be customized based on the specific application requirements
# Add appropriate health checks, smoke tests, or other validation steps here
echo "Running application-specific health checks..."
# Add your custom health check commands here

echo "Deployment completed successfully!"