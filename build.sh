ECR_REGISTRY="018993003597.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 018993003597.dkr.ecr.us-east-1.amazonaws.com
docker build -t stockmaster/frontend .
docker tag stockmaster/frontend:latest $ECR_REGISTRY/stockmaster/frontend:latest
docker push $ECR_REGISTRY/stockmaster/frontend:latest
