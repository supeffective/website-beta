import Link from 'next/link'
import { Button } from '../ui/button'

export function NavTopMenu() {
  return (
    <header className="sticky top-safe-top z-20 flex flex-col items-center justify-between p-4">
      <nav className="btn-group flex gap-0">
        <Button size={'sm'} variant={'gold'} className="hover:bg-nb-banana-gold" asChild>
          <Link href={`/pokemon`}>Pokémon</Link>
        </Button>
        <Button size={'sm'} className="hover:bg-nb-banana-gold" asChild>
          <Link href={`/boxes`}>Boxes</Link>
        </Button>
        <Button size={'sm'} className="hover:bg-nb-banana-gold" asChild>
          <Link href={`/games`}>Games</Link>
        </Button>
      </nav>
    </header>
  )
}
