package com.pokemon.handler;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

public class PokemonHandler extends SpringBootRequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    // This class adapts our Spring Cloud Functions to AWS Lambda
    // It will automatically handle the conversion between AWS Lambda events and our function inputs/outputs
} 