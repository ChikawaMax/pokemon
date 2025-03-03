import Link from 'next/link';
import Buttons from './buttons';

export default async function Header() {
  return (
    <>
      <Link
        href={'/'}
        className="border-b border-black flex items-center justify-center text-3xl py-3 mb-2"
      >
        ポケモン図鑑
      </Link>
      <Buttons />
    </>
  );
}
