package com.pokemon.service;

import com.pokemon.model.Pokemon;
import com.pokemon.model.PokemonListResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "pokemon-api", url = "${pokemon.api.url}")
public interface PokemonService {
    @GetMapping("/pokemon/{name}")
    String getPokemonByName(@PathVariable("name") String name);

    @GetMapping("/pokemon")
    String listPokemon(@RequestParam("limit") int limit, @RequestParam("offset") int offset);
} 