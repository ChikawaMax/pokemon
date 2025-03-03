import { CustomPokeAPI } from '@/types/pokemon';
import { PokeAPI } from 'pokeapi-types';

export function Name({
  pokejson,
  pokejapanjson,
}: {
  pokejson: CustomPokeAPI;
  pokejapanjson: PokeAPI.PokemonSpecies | null;
}) {
  //日本語の名前を取得
  const jaName =
    pokejapanjson?.names.find((name) => name.language.name === 'ja')?.name ||
    pokejson.name;

  return (
    <h2 className="text-xl pr-4">
      No.{pokejson.id} {jaName}
    </h2>
  );
}
