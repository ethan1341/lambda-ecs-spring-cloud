# Build the package
Write-Host "Building with Maven..."
mvn clean package

# Define S3 bucket for deployment (you should create this bucket first)
$s3_bucket = "pokemon-lambda-deployment-bucket"
$stack_name = "pokemon-api"
$region = "us-east-2"

# Package the SAM application
Write-Host "Packaging SAM application..."
sam package `
    --template-file template.yaml `
    --output-template-file packaged.yaml `
    --s3-bucket $s3_bucket `
    --region $region

# Deploy the packaged application
Write-Host "Deploying SAM application..."
sam deploy `
    --template-file packaged.yaml `
    --stack-name $stack_name `
    --capabilities CAPABILITY_IAM `
    --region $region

# Get the API Gateway endpoint URL
Write-Host "Getting API endpoint URL..."
$api_url = aws cloudformation describe-stacks `
    --stack-name $stack_name `
    --query "Stacks[0].Outputs[?OutputKey=='PokemonApi'].OutputValue" `
    --output text `
    --region $region

Write-Host "Deployment complete! Your API is available at: $api_url" 