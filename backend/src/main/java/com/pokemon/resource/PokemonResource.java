package com.pokemon.resource;

import com.pokemon.function.PokemonFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonResource {
    private static final Logger logger = LoggerFactory.getLogger(PokemonResource.class);

    @Autowired
    private PokemonFunction pokemonFunction;

    @GetMapping("/{name}")
    public ResponseEntity<String> getPokemon(@PathVariable String name) {
        try {
            String result = pokemonFunction.getPokemon().apply(name);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error getting Pokemon with name: " + name, e);
            return ResponseEntity.internalServerError().body("Error fetching Pokemon: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<String> listPokemon(@RequestParam(defaultValue = "20") int limit,
                                            @RequestParam(defaultValue = "0") int offset) {
        try {
            PokemonFunction.PaginationRequest request = new PokemonFunction.PaginationRequest();
            request.setLimit(limit);
            request.setOffset(offset);
            String result = pokemonFunction.listPokemon().apply(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error listing Pokemon with limit: " + limit + ", offset: " + offset, e);
            return ResponseEntity.internalServerError().body("Error listing Pokemon: " + e.getMessage());
        }
    }
} 