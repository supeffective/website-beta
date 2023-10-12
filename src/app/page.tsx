import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="flex gap-4">
        <Link href={`/pokemon`}>Pokémon</Link>
        <Link href={`/pokedex`}>Pokédexes</Link>
        <Link href={`/games`}>Games</Link>
        <Link href={`/boxes`}>Box System</Link>
      </nav>
    </main>
  )
}
