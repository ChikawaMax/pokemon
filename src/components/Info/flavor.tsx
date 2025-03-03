import { PokeAPI } from 'pokeapi-types';

export function Flavor({
  pokejapanjson,
}: {
  pokejapanjson: PokeAPI.PokemonSpecies | null;
}) {
  //日本語の説明文を取得
  const jaFlavor =
    pokejapanjson?.flavor_text_entries.find(
      (flavor_text) => flavor_text.language.name === 'ja'
    )?.flavor_text || '説明文取得できませんでした。';

  return <h4 className="text-lg mb-3">{jaFlavor}</h4>;
}
