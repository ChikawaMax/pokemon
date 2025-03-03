import { CustomPokeAPI } from '@/types/pokemon';

const statusLabels: Record<string, string> = {
  hp: 'HP',
  attack: '攻撃',
  defense: '防御',
  'special-attack': '特攻',
  'special-defense': '特防',
  speed: '素早さ',
};
export function List({ pokejson }: { pokejson: CustomPokeAPI }) {
  return (
    <table className="mt-3">
      <tbody>
        {pokejson.stats.map((stat) => (
          <tr key={stat.stat.name}>
            <td>{statusLabels[stat.stat.name] ?? stat.stat.name}</td>
            <td>:</td>
            <td>{stat.base_stat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
