'use client';

import { BookOpenIcon, BoxIcon, HomeIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { RadialMenu } from "../ui/radial-menu";

export function MainMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 125);
    }

    return (
        <RadialMenu isOpen={isOpen}
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
                }
            ]}>
            <div className="p-4 flex justify-between">
                <Button title="Home" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
                    <Link href="/"><HomeIcon /></Link>
                </Button>
                <div className="text-3xl font-extrabold">SupEffective</div>
                <Button title="Profile" variant="ghost" radius="full" size="icon" asChild onClick={closeMenu}>
                    <Link href="/profile"><User2Icon /></Link>
                </Button>
            </div>
        </RadialMenu>
    )
}
