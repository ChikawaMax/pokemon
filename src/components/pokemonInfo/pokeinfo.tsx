import Image from 'next/image';
import { PokeAPI } from 'pokeapi-types';
import { JSX } from 'react';

interface CustomPokeAPI extends PokeAPI.Pokemon {
  cries: {
    latest: string;
    legacy: string;
  };
}

interface PokeType {
  results: { name: string; url: string }[];
}

interface TypeJa {
  name: string;
  names: { language: { name: string }; name: string }[];
}

export default async function Pokeinfo({ url }: { url: string }) {
  try {
    const poke: Response = await fetch(url);
    if (!poke.ok) {
      throw new Error(`Failed to fetch [ ${url} ] : ${poke.status}`);
    }
    const pokejson: CustomPokeAPI = await poke.json();

    let jaName: string;
    let jaFlavor: string;

    try {
      const pokejapan: Response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokejson.id}`
      );
      if (!pokejapan.ok) {
        throw new Error(
          `Failed to fetch [ https://pokeapi.co/api/v2/pokemon-species/${pokejson.id} ] : ${pokejapan.status}`
        );
      }
      const pokejapanjson: PokeAPI.PokemonSpecies = await pokejapan.json();

      jaName =
        pokejapanjson.names.find((name) => name.language.name === 'ja')?.name ||
        pokejson.name;

      jaFlavor =
        pokejapanjson.flavor_text_entries.find(
          (flavor_text) => flavor_text.language.name === 'ja'
        )?.flavor_text || '説明文取得できませんでした。';
    } catch {
      jaName = pokejson.name;
      jaFlavor = '説明文取得できませんでした。';
    }

    const poketype: Response = await fetch('https://pokeapi.co/api/v2/type');
    if (!poketype.ok) {
      throw new Error(`Failed to fetch : ${poketype.status}`);
    }
    const poketypejson: PokeType = await poketype.json();

    let typefecth: Response;
    let typeResult;
    let typejson: TypeJa;
    let typejaname: JSX.Element[] = [];
    let typelangage;

    await Promise.all(
      pokejson.types.map(async (type) => {
        typeResult = poketypejson.results.find(
          (result) => result.name === type.type.name
        );
        if (typeResult && typeResult.url) {
          typefecth = await fetch(typeResult.url);
        }
        if (!typefecth.ok) {
          throw new Error(`Failed to fetch : ${typefecth.status}`);
        }
        typejson = await typefecth.json();

        typelangage = typejson.names.find(
          (name) => name.language.name === 'zh-Hant'
        );
        typejaname = [
          ...typejaname,
          <p key={type.type.name}>{typelangage?.name ?? 'タイプ取得不可'}</p>,
        ];
      })
    );

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
      <div className="border border-black rounded-md m-3 p-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl pr-4">
            No.{pokejson.id} {jaName}
          </h2>
          {typejaname}
        </div>
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
        <h4 className="text-lg mb-3">{jaFlavor}</h4>

        <audio controls>
          <source
            src={
              pokejson.cries.legacy
                ? pokejson.cries.legacy
                : pokejson.cries.latest
            }
            type="audio/ogg"
          />
        </audio>

        <ul className="list-disc list-inside mt-3">
          {pokejson.stats.map((stat, index) => (
            <li key={index}>
              {statusName[index]} : {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return `ポケモン情報の取得に失敗 ${error}`;
  }
}
