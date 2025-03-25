package com.pokemon.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokemon.model.Pokemon;
import com.pokemon.model.PokemonListResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PokemonService {
    @Autowired
    private ObjectMapper objectMapper;

    private List<Pokemon> pokemonList = new ArrayList<>();

    @PostConstruct
    public void init() {
        try {
            ClassPathResource resource = new ClassPathResource("pokemon-data.json");
            Map<String, List<Pokemon>> data = objectMapper.readValue(resource.getInputStream(), Map.class);
            this.pokemonList = data.get("pokemon");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load Pokemon data", e);
        }
    }

    public Pokemon getPokemonByName(String name) {
        return pokemonList.stream()
                .filter(p -> p.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Pokemon not found: " + name));
    }

    public PokemonListResponse listPokemon(int limit, int offset) {
        PokemonListResponse response = new PokemonListResponse();
        response.setCount(pokemonList.size());
        response.setResults(pokemonList.stream()
                .skip(offset)
                .limit(limit)
                .collect(Collectors.toList()));
        return response;
    }
} 