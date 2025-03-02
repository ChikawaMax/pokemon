import Pokeinfo from '@/components/Info/pokeinfo';
import { fetchJson } from '@/lib/fetchJson';

interface PokeObj {
  results: { name: string; url: string }[];
}

export default async function GetPokeInfo({ offset }: { offset: string }) {
  try {
    const pokejson: PokeObj = await fetchJson<PokeObj>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );

    if (pokejson.results.length === 0) {
      throw new Error('pokejson.results');
    }

    return (
      <>
        {pokejson.results.map((result) => (
          <Pokeinfo key={result.name} url={result.url} />
        ))}
      </>
    );
  } catch (error) {
    return `ポケモン情報の取得に失敗 ${error}`;
  }
}
