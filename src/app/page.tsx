import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <nav className="flex gap-0 btn-group">
        <Button size={"sm"} variant={"gold"} asChild><Link href={`/pokedex/national`}>Pokémon</Link></Button>
        <Button size={"sm"} asChild><Link href={`/boxes`}>Moves</Link></Button>
        <Button size={"sm"} asChild><Link href={`/games`}>Abilities</Link></Button>
      </nav>
    </div>
  )
}
