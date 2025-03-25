import { Box, Container, Flex, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box as="header" bg="brand.300" color="white" py={4} shadow="md">
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Heading size="lg">Pokémon App</Heading>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header; 