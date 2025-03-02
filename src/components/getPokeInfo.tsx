import Pokeinfo from '@/components/pokemonInfo/pokeinfo';

interface PokeObj {
  results: { name: string; url: string }[];
}

export default async function GetPokeInfo({ offset }: { offset: string }) {
  try {
    const poke = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    if (!poke.ok) {
      throw new Error(`Failed to fetch  ] : ${poke.status}`);
    }
    const pokejson: PokeObj = await poke.json();

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
