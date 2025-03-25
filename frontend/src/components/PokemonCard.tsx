import { Box, Image, Text, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  id: number;
}

const PokemonCard = ({ name, id }: PokemonCardProps) => {
  return (
    <Link as={RouterLink} to={`/pokemon/${name}`} _hover={{ textDecoration: 'none' }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-2px)',
          shadow: 'md',
        }}
      >
        <VStack spacing={3}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            boxSize="120px"
            fallbackSrc="https://via.placeholder.com/120"
          />
          <Text
            fontSize="lg"
            fontWeight="semibold"
            textTransform="capitalize"
            color="gray.700"
          >
            {name}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default PokemonCard; 