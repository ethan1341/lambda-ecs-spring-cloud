import { useState, useEffect } from 'react';
import {
  Container,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import PokemonCard from './PokemonCard';
import { pokemonApi, type Pokemon } from '../services/api';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const toast = useToast();

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      console.log('Fetching Pokemon with limit:', limit, 'offset:', offset);
      const data = await pokemonApi.getPokemons(limit, offset);
      console.log('Received Pokemon data:', data);
      setPokemonList(data.results);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch Pokemon list',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="brand.300" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} width="100%">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={parseInt(pokemon.url.split('/')[6])}
            />
          ))}
        </SimpleGrid>

        <HStack spacing={4}>
          <Button
            onClick={handlePrevious}
            isDisabled={offset === 0}
            colorScheme="brand"
          >
            Previous
          </Button>
          <Text color="gray.600">
            Page {Math.floor(offset / limit) + 1}
          </Text>
          <Button
            onClick={handleNext}
            colorScheme="brand"
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default PokemonList; 