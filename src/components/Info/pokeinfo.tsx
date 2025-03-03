import { fetchJson } from '@/lib/fetchJson';
import { CustomPokeAPI } from '@/types/pokemon';
import { PokeAPI } from 'pokeapi-types';
import { Audio } from './audio';
import { List } from './list';
import { Img } from './img';
import { Name } from './name';
import { Flavor } from './flavor';
import { Type } from './type';

export default async function Pokeinfo({ url }: { url: string }) {
  try {
    //ポケモンAPIの取得
    const pokejson = await fetchJson<CustomPokeAPI>(url);

    //日本語情報の取得
    let pokejapanjson: PokeAPI.PokemonSpecies | null = null;
    try {
      pokejapanjson = await fetchJson<PokeAPI.PokemonSpecies>(
        `https://pokeapi.co/api/v2/pokemon-species/${pokejson.id}`
      );
    } catch {
      console.warn(`日本語情報の取得に失敗しました: ${pokejson.name}`);
    }

    return (
      <div className="border border-black rounded-md m-3 p-3">
        <div className="flex gap-2 items-center">
          <Name pokejson={pokejson} pokejapanjson={pokejapanjson} />
          <Type pokejson={pokejson} />
        </div>
        <Img pokejson={pokejson} />
        <Flavor pokejapanjson={pokejapanjson} />
        <Audio pokejson={pokejson} />
        <List pokejson={pokejson} />
      </div>
    );
  } catch (error) {
    return `ポケモン情報の取得に失敗 ${error}`;
  }
}
