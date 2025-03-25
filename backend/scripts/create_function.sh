#!/bin/bash

# Set variables
FUNCTION_NAME="pokemon-service"
REGION="us-east-2"
JAR_FILE="../target/pokemon-api-1.0-SNAPSHOT.jar"
HANDLER="com.pokemon.handler.PokemonHandler"
ROLE_ARN="arn:aws:iam::ACCOUNT_ID:role/lambda-execution-role"  # Replace ACCOUNT_ID with your AWS account ID

# Check if function exists
function_exists=$(aws lambda get-function --function-name $FUNCTION_NAME --region $REGION 2>&1 | grep "Function not found" || true)

if [ -n "$function_exists" ]; then
  echo "Creating new Lambda function: $FUNCTION_NAME..."
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime java11 \
    --role $ROLE_ARN \
    --handler $HANDLER \
    --zip-file fileb://$JAR_FILE \
    --timeout 30 \
    --memory-size 512 \
    --region $REGION
else
  echo "Lambda function $FUNCTION_NAME already exists."
fi

# Create or update API Gateway integration
echo "Setting up API Gateway integration..." 