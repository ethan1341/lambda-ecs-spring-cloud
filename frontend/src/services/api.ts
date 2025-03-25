import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetails {
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

export const pokemonApi = {
  // Get a list of Pokemon with pagination
  getPokemons: async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    try {
      console.log('API Call: Getting Pokemon list with limit:', limit, 'offset:', offset);
      const response = await api.get<string>(`/pokemon?limit=${limit}&offset=${offset}`);
      console.log('Raw API Response:', response);
      
      if (typeof response.data === 'string') {
        try {
          const parsedData = JSON.parse(response.data);
          console.log('Parsed Pokemon data:', parsedData);
          return parsedData;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          console.log('Raw response data:', response.data);
          throw new Error('Failed to parse Pokemon data');
        }
      } else {
        console.log('Response data is not a string:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Error in getPokemons:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },

  // Get details of a specific Pokemon by name
  getPokemonByName: async (name: string): Promise<PokemonDetails> => {
    try {
      console.log('API Call: Getting Pokemon details for:', name);
      const response = await api.get<string>(`/pokemon/${name}`);
      console.log('Raw API Response:', response);
      
      if (typeof response.data === 'string') {
        try {
          const parsedData = JSON.parse(response.data);
          console.log('Parsed Pokemon details:', parsedData);
          return parsedData;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          console.log('Raw response data:', response.data);
          throw new Error('Failed to parse Pokemon details');
        }
      } else {
        console.log('Response data is not a string:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Error in getPokemonByName:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },
};

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response Interceptor:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Error Interceptor:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api; 