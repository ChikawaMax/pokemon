import { PokeAPI } from 'pokeapi-types';

//https://pokeapi.co/api/v2/pokemon/1/の型
export interface CustomPokeAPI extends PokeAPI.Pokemon {
  cries: {
    latest: string;
    legacy: string;
  };
}

//https://pokeapi.co/api/v2/type/の型
export interface PokeType {
  results: { name: string; url: string }[];
}

//https://pokeapi.co/api/v2/type/1/の型
export interface TypeJa {
  name: string;
  names: { language: { name: string }; name: string }[];
}
