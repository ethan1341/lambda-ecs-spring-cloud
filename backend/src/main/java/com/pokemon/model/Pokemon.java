package com.pokemon.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Pokemon {
    private int id;
    private String name;
    private int height;
    private int weight;
    private Sprites sprites;
    private List<Type> types;
    private List<Stat> stats;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Sprites {
        private String front_default;

        public String getFront_default() { return front_default; }
        public void setFront_default(String front_default) { this.front_default = front_default; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Type {
        private int slot;
        private TypeDetails type;

        public int getSlot() { return slot; }
        public void setSlot(int slot) { this.slot = slot; }
        public TypeDetails getType() { return type; }
        public void setType(TypeDetails type) { this.type = type; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TypeDetails {
        private String name;
        private String url;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Stat {
        private int base_stat;
        private StatDetails stat;

        public int getBase_stat() { return base_stat; }
        public void setBase_stat(int base_stat) { this.base_stat = base_stat; }
        public StatDetails getStat() { return stat; }
        public void setStat(StatDetails stat) { this.stat = stat; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class StatDetails {
        private String name;
        private String url;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getHeight() { return height; }
    public void setHeight(int height) { this.height = height; }
    public int getWeight() { return weight; }
    public void setWeight(int weight) { this.weight = weight; }
    public Sprites getSprites() { return sprites; }
    public void setSprites(Sprites sprites) { this.sprites = sprites; }
    public List<Type> getTypes() { return types; }
    public void setTypes(List<Type> types) { this.types = types; }
    public List<Stat> getStats() { return stats; }
    public void setStats(List<Stat> stats) { this.stats = stats; }
} 