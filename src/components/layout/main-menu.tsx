import { BookOpenIcon, BoxIcon, HomeIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { FloatingMenu } from "../ui/floating-menu";

export function MainMenu() {
    return (
        <FloatingMenu radiusOpen={50} radiusClosed={-50} buttons={[
            {
                children: <HomeIcon />,
                href: '/',
                title: 'Homepage',
                text: 'Home',
            },
            {
                children: <BookOpenIcon />,
                href: '/pokedex/national',
                title: 'National Pokédex',
                text: 'Pokédex',
            },
            {
                children: <BoxIcon />,
                href: '/boxes',
                title: 'Living Dex',
                text: 'Boxes',
            }
        ]}>
            <div className="p-4 flex justify-between">
                <Button title="Home" variant="ghost" radius="full" size="icon" asChild>
                    <Link href="/"><HomeIcon /></Link>
                </Button>
                <div className="text-3xl font-extrabold">SupEffective</div>
                <Button title="Profile" variant="ghost" radius="full" size="icon" asChild>
                    <Link href="/profile"><User2Icon /></Link>
                </Button>
            </div>
        </FloatingMenu>
    )
}
