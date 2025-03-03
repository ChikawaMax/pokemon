import { CustomPokeAPI, PokeType, TypeJa } from '@/types/pokemon';
import { fetchJson } from '../../lib/fetchJson';

export async function Type({ pokejson }: { pokejson: CustomPokeAPI }) {
  //ポケモンのタイプ情報取得
  const poketypejson: PokeType = await fetchJson<PokeType>(
    'https://pokeapi.co/api/v2/type'
  );

  //日本語のタイプを取得
  const typejaname = await Promise.all(
    //https://pokeapi.co/api/v2/pokemon/1/で取得したタイプと一致しているタイプ情報取得
    pokejson.types.map(async ({ type }) => {
      //ポケモンのタイプと一致しているタイプ情報を変数に格納
      const typeData = poketypejson.results.find((r) => r.name === type.name);
      if (!typeData) return 'タイプ取得不可';

      //一致していたタイプ情報の日本語を取得して、タグに入れる
      const typejson = await fetchJson<TypeJa>(typeData.url);

      return (
        <p key={type.name}>
          {typejson.names.find((name) => name.language.name === 'ja')?.name ||
            'タイプ取得不可'}
        </p>
      );
    })
  );
  return <>{typejaname}</>;
}
