import { CustomPokeAPI } from '@/types/pokemon';

export function Audio({ pokejson }: { pokejson: CustomPokeAPI }) {
  return (
    <audio controls>
      <source
        src={
          pokejson.cries.legacy ? pokejson.cries.legacy : pokejson.cries.latest
        }
        type="audio/ogg"
      />
    </audio>
  );
}
