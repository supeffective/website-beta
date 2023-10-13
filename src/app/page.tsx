import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex gap-0 btn-group">
        <Button asChild><Link href={`/pokedex/national`}>Pokédex</Link></Button>
        <Button asChild><Link href={`/boxes`}>Tracker</Link></Button>
        <Button asChild><Link href={`/games`}>Profile</Link></Button>
      </nav>
    </div>
  )
}
