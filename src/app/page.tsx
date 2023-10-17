import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <nav className="btn-group flex gap-0">
        <Button size={'sm'} variant={'gold'} asChild>
          <Link href={`/pokedex/national`}>Pokémon</Link>
        </Button>
        <Button size={'sm'} asChild>
          <Link href={`/boxes`}>Moves</Link>
        </Button>
        <Button size={'sm'} asChild>
          <Link href={`/games`}>Abilities</Link>
        </Button>
      </nav>
    </div>
  )
}
