import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Heading,
  Badge,
  Button,
  Grid,
  GridItem,
  Progress,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
  };
}

const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get<string>(
          `${import.meta.env.VITE_API_URL}/pokemon/${name}`
        );
        const data: PokemonDetails = JSON.parse(response.data);
        setPokemon(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch Pokemon details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchPokemonDetails();
    }
  }, [name, toast]);

  const getStatColor = (baseStat: number) => {
    if (baseStat >= 100) return 'green';
    if (baseStat >= 50) return 'blue';
    return 'red';
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="brand.300" />
      </Center>
    );
  }

  if (!pokemon) {
    return (
      <Center h="50vh">
        <Text>Pokemon not found</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Button
          onClick={() => navigate(-1)}
          colorScheme="brand"
          width="fit-content"
        >
          Back
        </Button>

        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          shadow="md"
        >
          <VStack spacing={6}>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              boxSize="200px"
              fallbackSrc="https://via.placeholder.com/200"
            />

            <Heading textTransform="capitalize">{pokemon.name}</Heading>

            <HStack spacing={4}>
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme="purple"
                  fontSize="sm"
                  textTransform="capitalize"
                >
                  {type.type.name}
                </Badge>
              ))}
            </HStack>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} width="100%">
              <GridItem>
                <Text fontWeight="bold">Height</Text>
                <Text>{(pokemon.height / 10).toFixed(1)}m</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Weight</Text>
                <Text>{(pokemon.weight / 10).toFixed(1)}kg</Text>
              </GridItem>
            </Grid>

            <Box width="100%">
              <Text fontWeight="bold" mb={4}>Base Stats</Text>
              <VStack spacing={4} align="stretch">
                {pokemon.stats.map((stat) => (
                  <Box key={stat.stat.name}>
                    <HStack justify="space-between" mb={1}>
                      <Text textTransform="capitalize">{stat.stat.name.replace('-', ' ')}</Text>
                      <Text fontWeight="bold">{stat.base_stat}</Text>
                    </HStack>
                    <Progress
                      value={stat.base_stat}
                      max={200}
                      colorScheme={getStatColor(stat.base_stat)}
                      borderRadius="full"
                      size="sm"
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default PokemonDetail; 