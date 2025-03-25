# Pokémon Application

A full-stack application that integrates with the PokéAPI, built using modern cloud technologies.

## Architecture

- **Frontend**: React with TypeScript
- **Backend**: Spring Boot microservice
- **Serverless**: AWS Lambda
- **Container Orchestration**: AWS ECS
- **API Integration**: PokéAPI

## Project Structure

```
.
├── frontend/           # React TypeScript application
├── backend/           # Spring Boot application
├── lambda/            # AWS Lambda function
├── infrastructure/    # Docker and ECS configuration
└── README.md
```

## Prerequisites

- Java 17+
- Node.js 18+
- Docker
- AWS CLI configured
- Maven

## Getting Started

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the application:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Lambda Function

1. Navigate to the lambda directory:
```bash
cd lambda
```

2. Install dependencies:
```bash
npm install
```

3. Build the function:
```bash
npm run build
```

## Deployment

Detailed deployment instructions for AWS ECS and Lambda can be found in the `infrastructure/README.md` file.

## API Documentation

The application uses the following endpoints:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- PokéAPI: `https://pokeapi.co/api/v2`

## License

MIT 