import { CustomPokeAPI } from '@/types/pokemon';
import Image from 'next/image';
import { PokeAPI } from 'pokeapi-types';

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

export function Img({ pokejson }: { pokejson: CustomPokeAPI }) {
  return (
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
  );
}
