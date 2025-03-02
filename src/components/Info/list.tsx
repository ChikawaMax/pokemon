import { CustomPokeAPI } from '@/types/pokemon';

const statusName = ['HP', '攻撃', '防御', '特攻', '特防', '素早さ'];

export function List({ pokejson }: { pokejson: CustomPokeAPI }) {
  return (
    <ul className="list-disc list-inside mt-3">
      {pokejson.stats.map((stat, index) => (
        <li key={index}>
          {statusName[index]} : {stat.base_stat}
        </li>
      ))}
    </ul>
  );
}
