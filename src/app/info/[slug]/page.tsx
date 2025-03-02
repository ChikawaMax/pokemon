import GetPokeInfo from '@/components/getPokeInfo';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <GetPokeInfo offset={slug} />;
}
