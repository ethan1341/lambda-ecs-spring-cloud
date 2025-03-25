package com.pokemon.resource;

import com.pokemon.model.Pokemon;
import com.pokemon.model.PokemonListResponse;
import com.pokemon.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping("/pokemon/{name}")
    public ResponseEntity<Pokemon> getPokemonByName(@PathVariable String name) {
        try {
            Pokemon pokemon = pokemonService.getPokemonByName(name);
            return ResponseEntity.ok(pokemon);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/pokemon")
    public ResponseEntity<PokemonListResponse> listPokemon(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        try {
            PokemonListResponse response = pokemonService.listPokemon(limit, offset);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
} 