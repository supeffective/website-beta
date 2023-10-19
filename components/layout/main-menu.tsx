'use client'

import { BookOpenIcon, BoxIcon, HomeIcon, LogOutIcon, User2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { RadialMenu } from '../ui/radial-menu'

export function MainMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated' && session?.user
  const user = isLoggedIn ? session?.user : undefined

  const closeMenu = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 125)
  }

  return (
    <RadialMenu
      isOpen={isOpen}
      onTriggerClick={() => setIsOpen(!isOpen)}
      radiusOpen={50}
      radiusClosed={-50}
      buttons={[
        {
          children: <HomeIcon />,
          href: '/',
          title: 'Homepage',
          text: 'Home',
          onClick: closeMenu,
        },
        {
          children: <BookOpenIcon />,
          href: '/pokedex/national',
          title: 'National Pokédex',
          text: 'Pokédex',
          onClick: closeMenu,
        },
        {
          children: <BoxIcon />,
          href: '/boxes',
          title: 'Living Dex',
          text: 'Boxes',
          onClick: closeMenu,
        },
      ]}
    >
      <div className="flex justify-between p-4">
        <Button title="Home" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>
        <div className="text-center">
          <div className="text-3xl font-extrabold">SupEffective</div>
          {user && <div>{user.email}</div>}
        </div>
        <div className="flex flex-col gap-2">
          {user && (
            <>
              <Button title="Profile" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
                <Link href="/profile">
                  <User2Icon />
                </Link>
              </Button>
              <Button title="Logout" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
                <Link href="/api/auth/signout">
                  <LogOutIcon />
                </Link>
              </Button>
            </>
          )}
          {!user && (
            <Button title="Sign In" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
              <Link href="/api/auth/signin">
                <User2Icon />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </RadialMenu>
  )
}
