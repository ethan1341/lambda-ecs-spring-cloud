#!/bin/bash

# Build the application
echo "Building the application..."
mvn clean package -DskipTests

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

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