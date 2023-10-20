import Link from 'next/link'
import { Button } from '../ui/button'

export function NavTopMenu() {
  return (
    <nav className="btn-group mb-4 flex gap-0">
      <Button size={'sm'} variant={'gold'} asChild>
        <Link href={`/pokemon`}>Pokémon</Link>
      </Button>
      <Button size={'sm'} asChild>
        <Link href={`/boxes`}>Boxes</Link>
      </Button>
      <Button size={'sm'} asChild>
        <Link href={`/games`}>Games</Link>
      </Button>
    </nav>
  )
}
