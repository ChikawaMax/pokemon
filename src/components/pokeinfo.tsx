import Image from 'next/image';
import { PokeAPI } from 'pokeapi-types';

interface CustomPokeAPI extends PokeAPI.Pokemon {
  cries: {
    latest: string;
    legacy: string;
  };
}

export default async function Pokeinfo({ url }: { url: string }) {
  const poke = await fetch(url);
  const pokejson = (await poke.json()) as CustomPokeAPI;

  const pokejapan = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokejson.id}`
  );
  const pokejapanjson = (await pokejapan.json()) as PokeAPI.PokemonSpecies;

  const Name = pokejapanjson.names.find(
    (name) => name.language.name === 'ja'
  )?.name;
  const Flavor = pokejapanjson.flavor_text_entries.find(
    (flavor_text) => flavor_text.language.name === 'ja'
  )?.flavor_text;

  const spritesArray: Array<keyof PokeAPI.PokemonSprites> = [
    'front_default',
    'back_default',
    'front_female',
    'back_female',
    'front_shiny',
    'back_shiny',
    'front_shiny_female',
    'back_shiny_female',
  ];

  const statusName = ['HP', '攻撃', '防御', '特攻', '特防', '素早さ'];

  return (
    <div>
      <h2>
        No.{pokejson.id} {Name}
      </h2>

      <div className="flex">
        {spritesArray.map((sprite) => {
          const spritURL = pokejson.sprites[sprite];
          return (
            spritURL && (
              <div key={sprite}>
                {typeof spritURL === 'string' && (
                  <Image
                    src={spritURL}
                    width={100}
                    height={100}
                    alt={pokejson.name}
                  />
                )}
              </div>
            )
          );
        })}
      </div>
      <audio controls>
        <source src={pokejson.cries.legacy} type="audio/ogg" />
      </audio>
      <ul>
        {pokejson.stats.map((stat, index) => (
          <li key={index}>
            {statusName[index]} : {stat.base_stat}
          </li>
        ))}
      </ul>
      <h4>{Flavor}</h4>
    </div>
  );
}
