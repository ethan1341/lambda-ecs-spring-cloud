#!/bin/bash

# Set variables
FUNCTION_NAME="pokemon-service"
REGION="us-east-2"
JAR_FILE="../target/pokemon-api-1.0-SNAPSHOT.jar"
HANDLER="com.pokemon.handler.PokemonHandler"

# Deploy to Lambda
echo "Deploying to AWS Lambda function: $FUNCTION_NAME..."
aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://$JAR_FILE \
  --region $REGION

# Update function configuration
aws lambda update-function-configuration \
  --function-name $FUNCTION_NAME \
  --handler $HANDLER \
  --runtime java11 \
  --timeout 30 \
  --memory-size 512 \
  --region $REGION

echo "Deployment complete!" 