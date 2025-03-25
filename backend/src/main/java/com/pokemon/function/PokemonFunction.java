package com.pokemon.function;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokemon.model.Pokemon;
import com.pokemon.model.PokemonListResponse;
import com.pokemon.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import java.util.function.Function;
import java.util.HashMap;
import java.util.Map;

@Component
public class PokemonFunction {
    @Autowired
    private PokemonService pokemonService;
    
    @Autowired
    private ObjectMapper objectMapper;

    public Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> getPokemon() {
        return request -> {
            try {
                String name = request.getPathParameters().get("name");
                Pokemon pokemon = pokemonService.getPokemonByName(name);
                String result = objectMapper.writeValueAsString(pokemon);
                return createResponse(200, result);
            } catch (Exception e) {
                return createResponse(500, "Error fetching Pokemon: " + e.getMessage());
            }
        };
    }

    public Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> listPokemon() {
        return request -> {
            try {
                Map<String, String> queryParams = request.getQueryStringParameters();
                int limit = 20;
                int offset = 0;
                
                if (queryParams != null) {
                    if (queryParams.containsKey("limit")) {
                        limit = Integer.parseInt(queryParams.get("limit"));
                    }
                    if (queryParams.containsKey("offset")) {
                        offset = Integer.parseInt(queryParams.get("offset"));
                    }
                }
                
                PokemonListResponse response = pokemonService.listPokemon(limit, offset);
                String result = objectMapper.writeValueAsString(response);
                return createResponse(200, result);
            } catch (Exception e) {
                return createResponse(500, "Error listing Pokemon: " + e.getMessage());
            }
        };
    }

    private APIGatewayProxyResponseEvent createResponse(int statusCode, String body) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(statusCode);
        response.setBody(body);
        
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Methods", "GET, OPTIONS");
        headers.put("Access-Control-Allow-Headers", "Content-Type");
        response.setHeaders(headers);
        
        return response;
    }
} 