'use client'

import { UserSessionAttributes } from '@/lib/auth/types'
import routes from '@/lib/router/routes'
import { BookOpenIcon, BoxIcon, GithubIcon, HomeIcon, LogOutIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ApiForm from '../forms/api-form'
import { Button } from '../ui/button'
import { RadialMenu } from '../ui/radial-menu'

export function NavBottomMenu({ user }: { user: UserSessionAttributes | undefined | null }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // if is standalone, remove window title:
    if ((window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches) {
      const titleElement = document.head.querySelector('title')
      if (titleElement) {
        titleElement.innerHTML = ''
      }
    }
  }, [])

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
          href: '/pokedex',
          title: 'Pokédex',
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
        <div className="flex flex-col gap-2">
          <Button title="Home" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
            <Link href="/">
              <HomeIcon />
            </Link>
          </Button>
          <Button title="Github" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
            <a href="https://github.com/itsjavi/supereffective-2024" target="_blank" rel="noreferrer">
              <GithubIcon />
            </a>
          </Button>
        </div>
        <div className="text-center">
          <div className="text-3xl font-extrabold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/logo.svg?v=1" height={112} width={144} alt="Super Effective" className="h-28 w-36" />
          </div>
          {user && <div>{user.email}</div>}
        </div>
        <div className="flex flex-col gap-2">
          {user && (
            <>
              <Button title="Profile" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
                <Link href="/profile" scroll={false}>
                  <User2Icon />
                </Link>
              </Button>
              <ApiForm method="post" action="/auth/signout">
                <Button title="Logout" variant="ghost" radius="full" size="icon">
                  <LogOutIcon />
                </Button>
              </ApiForm>
            </>
          )}
          {!user && (
            <Button title="Sign In" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
              <Link href={routes.login} scroll={false}>
                <User2Icon />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </RadialMenu>
  )
}
