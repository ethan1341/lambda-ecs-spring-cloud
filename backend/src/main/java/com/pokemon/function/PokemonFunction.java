package com.pokemon.function;

import com.pokemon.model.Pokemon;
import com.pokemon.model.PokemonListResponse;
import com.pokemon.service.PokemonService;
import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class PokemonFunction {
    @Autowired
    private PokemonService pokemonService;

    public Function<String, String> getPokemon() {
        return name -> pokemonService.getPokemonByName(name);
    }

    public Function<PaginationRequest, String> listPokemon() {
        return request -> pokemonService.listPokemon(request.getLimit(), request.getOffset());
    }

    public static class PaginationRequest {
        private int limit;
        private int offset;

        public int getLimit() {
            return limit;
        }

        public void setLimit(int limit) {
            this.limit = limit;
        }

        public int getOffset() {
            return offset;
        }

        public void setOffset(int offset) {
            this.offset = offset;
        }
    }
} 