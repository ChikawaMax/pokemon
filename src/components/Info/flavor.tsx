import { CustomPokeAPI } from '@/types/pokemon';
import { PokeAPI } from 'pokeapi-types';

export function Flavor({
  pokejson,
  pokejapanjson,
}: {
  pokejson: CustomPokeAPI;
  pokejapanjson: PokeAPI.PokemonSpecies;
}) {
  let jaFlavor: string = '説明文取得できませんでした。'; //ポケモンの説明文
  //日本語の説明文を取得
  jaFlavor =
    pokejapanjson.flavor_text_entries.find(
      (flavor_text) => flavor_text.language.name === 'ja'
    )?.flavor_text || '説明文取得できませんでした。';
  return <h4 className="text-lg mb-3">{jaFlavor}</h4>;
}
