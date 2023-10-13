'use client';

import { cn } from "@/lib/utils";
import { BookIcon, BoxIcon, MenuIcon, User2Icon, XIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { Button } from "./button";

export function FloatingMenu(props: { radiusOpen?: number, radiusClosed?: number }): ReactElement {
    const [isOpen, setIsOpen] = useState(false)
    const radiusOpen = props.radiusOpen ?? 60;
    const radiusClosed = props.radiusClosed ?? (radiusOpen * -1);

    function closeMenu() {
        setIsOpen(false)
    }

    function renderOverlay() {
        if (!isOpen) {
            return null;
        }
        return (
            <div data-state={isOpen ? 'open' : 'closed'} className="fixed inset-0 z-40 bg-nb-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        )
    }

    function renderTrigger() {
        return (
            <Button className="pointer-events-auto transition-transform hover:scale-110" data-testid="trigger" variant={isOpen ? "primary" : "secondary"} radius="full" size="icon"
                onClick={
                    () => setIsOpen(!isOpen)
                }>
                {!isOpen && <MenuIcon />}
                {isOpen && <XIcon />}
            </Button>
        )
    }

    function _calculateTransform(totalChildren: number, index: number): { translate: string } | {} {
        const radius = isOpen ? radiusOpen : radiusClosed;
        const angle = (Math.PI / (totalChildren - 1)) * index - Math.PI;
        const x = radius * Math.cos(angle);
        const y = isOpen ? radius * Math.sin(angle) : radiusOpen - radiusOpen / 5;

        return {
            transform: `translate(${x}px, ${y}px)`,
        }
    }

    function renderLinks() {
        const openClasses = "transition-all duration-300 ease-in-out opacity-100 pointer-events-auto"
        const closedClasses = "transition-all duration-300 ease-in-out opacity-0 pointer-events-none"
        const className = cn("inline-block w-[64px]", isOpen ? openClasses : closedClasses)
        const btnClasses = cn("bg-nb-white hover:bg-nb-accent transition-transform hover:scale-110")

        const translate0 = cn(className, { "-translate-y-[10px] -translate-x-[30px]": isOpen, "translate-y-[20px] translate-x-0": !isOpen })
        const translate1 = cn(className, { "-translate-y-[60px]": isOpen, "translate-y-0": !isOpen })
        const translate2 = cn(className, { "-translate-y-[10px] translate-x-[30px]": isOpen, "translate-y-[20px] translate-x-0": !isOpen })

        return (
            <div className="text-center">
                <div className={className} style={_calculateTransform(3, 0)}>
                    <Button radius="full" size="icon" className={btnClasses} asChild onClick={closeMenu}>
                        <Link href="/pokedex/national" title="National Pokédex"><BookIcon /></Link>
                    </Button>
                    {isOpen && <div>Pokédex</div>}
                </div>
                <div className={className} style={_calculateTransform(3, 1)}>
                    <Button radius="full" size="icon" className={btnClasses} asChild onClick={closeMenu}>
                        <Link href="/boxes" title="Living Dex Tracker"><BoxIcon /></Link>
                    </Button>
                    {isOpen && <div>Tracker</div>}
                </div>
                <div className={className} style={_calculateTransform(3, 2)}>
                    <Button radius="full" size="icon" className={btnClasses} asChild onClick={closeMenu}>
                        <Link href="/" title="Homepage"><User2Icon /></Link>
                    </Button>
                    {isOpen && <div>Profile</div>}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderOverlay()}
            <div className="fixed z-50 select-none bottom-0 left-0 right-0 pb-7 text-center pointer-events-none">
                {renderLinks()}
                {renderTrigger()}
            </div>
        </>
    )
}
