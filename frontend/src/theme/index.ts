import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#ffe5e5',
    100: '#fbb8b8',
    200: '#f48a8a',
    300: '#ef5350', // Primary
    400: '#e82f2a',
    500: '#ce1510',
    600: '#a10e0b',
    700: '#740806',
    800: '#470302',
    900: '#1f0000',
  },
  water: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5', // Secondary
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'lg',
    },
    variants: {
      solid: (props: { colorScheme: string }) => ({
        bg: props.colorScheme === 'brand' ? 'brand.300' : `${props.colorScheme}.400`,
        color: 'white',
        _hover: {
          bg: props.colorScheme === 'brand' ? 'brand.400' : `${props.colorScheme}.500`,
        },
      }),
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        overflow: 'hidden',
        boxShadow: 'sm',
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
});

export default theme; 