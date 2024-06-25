import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      brand: {
        50: '#f3f4f6',
        100: '#e5e7eb',
        200: '#ccd1d9',
        300: '#abb4c2',
        400: '#7f8b9a',
        500: '#495566',
        600: '#354151',
        700: '#2d3847',
        800: '#232c39',
        900: '#1a212b',
      },
      // Define other light mode colors as needed
    },
    dark: {
      brand: {
        50: '#2b2b2b',
        100: '#262626',
        200: '#202020',
        300: '#1b1b1b',
        400: '#151515',
        500: '#101010',
        600: '#0b0b0b',
        700: '#060606',
        800: '#000000',
        900: '#000000',
      },
      // Define other dark mode colors as needed
    },
  },
  fonts: {
    // Define your custom fonts if needed
  },
  components: {
    // Customize components if needed
  },
});

export default theme;
