import { BookOpenIcon, BoxIcon, HomeIcon } from "lucide-react";
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
        ]} />
    )
}
