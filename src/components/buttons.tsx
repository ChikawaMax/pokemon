import { fetchJson } from '@/lib/fetchJson';
import Link from 'next/link';
import { JSX } from 'react';

export default async function Buttons() {
  const pokejson: { count: number } = await fetchJson<{ count: number }>(
    'https://pokeapi.co/api/v2/pokemon'
  );

  let LinkArray: JSX.Element[] = [];
  for (let i = 0; i < pokejson.count; i += 20) {
    LinkArray = [
      ...LinkArray,
      <Link
        className="border py-1 px-2 bg-stone-500 hover:bg-stone-700 text-white rounded-md inline-flex items-center justify-center"
        key={i}
        href={`/info/${i}`}
      >{`No.${i + 1} ~ No.${i + 20}`}</Link>,
    ];
  }

  return <div className="grid grid-cols-7 gap-1 mb-3">{LinkArray}</div>;
}
