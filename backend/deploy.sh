#!/bin/bash

# Build the project
mvn clean package -DskipTests

# Create Lambda function if it doesn't exist
aws lambda create-function \
  --function-name pokemon-api \
  --handler com.pokemon.handler.PokemonHandler \
  --runtime java11 \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-role \
  --code S3Bucket=YOUR_BUCKET,S3Key=pokemon-api-1.0-SNAPSHOT.jar \
  --memory-size 512 \
  --timeout 30 \
  --environment Variables={SPRING_PROFILES_ACTIVE=prod} \
  || aws lambda update-function-code \
     --function-name pokemon-api \
     --s3-bucket YOUR_BUCKET \
     --s3-key pokemon-api-1.0-SNAPSHOT.jar

# Deploy using SAM
echo "Deploying to AWS..."
sam deploy \
    --template-file template.yaml \
    --stack-name pokemon-api \
    --capabilities CAPABILITY_IAM \
    --no-confirm-changeset

# Get the API endpoint
echo "Getting API endpoint..."
aws cloudformation describe-stacks \
    --stack-name pokemon-api \
    --query 'Stacks[0].Outputs[?OutputKey==`PokemonApi`].OutputValue' \
    --output text 