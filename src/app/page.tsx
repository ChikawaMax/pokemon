import Pokeinfo from '@/components/pokeinfo';

export default async function Page() {
  const poke = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=1300&limit=20`
  );
  const pokejson = await poke.json();

  console.log(pokejson);

  return (
    <>
      {pokejson.results.map((result) => (
        <Pokeinfo key={result.name} url={result.url} />
      ))}
    </>
  );
}
