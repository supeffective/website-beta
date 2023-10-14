'use client';

import { useSearchState } from "@/hooks/useSearchState";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { Button } from "./button";

type FloatingMenuProps = {
    radiusOpen?: number,
    radiusClosed?: number,
    children?: ReactNode,
    buttons: Array<{
        className?: string,
        onClick?: () => void,
        href?: string,
        children?: ReactElement,
        title?: string,
        text?: string,
    }>
}

export function FloatingMenu(props: FloatingMenuProps): ReactElement {
    const [search, setSearch] = useSearchState<{ menu?: string }>()
    const radiusOpen = props.radiusOpen ?? 60;
    const radiusClosed = props.radiusClosed ?? (radiusOpen * -1);
    const { buttons, children: overlayContent } = props;
    const isOpen = search.menu === '1'

    function setIsOpen(value: boolean) {
        setSearch({ menu: value ? '1' : undefined })
    }

    function renderOverlay() {
        if (!isOpen) {
            return null;
        }
        return (
            <div data-state={isOpen ? 'open' : 'closed'} className="fixed border-2 pt-safe-top pb-safe-bottom pr-safe-right pl-safe-left inset-0 z-40 bg-nb-banana-gold data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                {overlayContent}
            </div>
        )
    }

    function renderTrigger() {
        return (
            <Button title="Menu" tabIndex={0} className="pointer-events-auto transition-transform hover:scale-110" data-testid="trigger" variant={isOpen ? "primary" : "secondary"} radius="full" size="icon"
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

    function renderButtons() {
        const openClasses = "transition-all duration-300 ease-in-out opacity-100 pointer-events-auto"
        const closedClasses = "transition-all duration-300 ease-in-out opacity-0 pointer-events-none"
        const className = cn("inline-block w-[64px]", isOpen ? openClasses : closedClasses)
        const btnClasses = cn("bg-nb-white hover:bg-nb-accent transition-transform hover:scale-110")


        return (
            <nav className="text-center">
                {buttons?.map((btn, index) => {
                    const child = btn.href ? <Link href={btn.href} title={btn.title}>{btn.children}</Link> : btn.children;
                    return (
                        <div key={`btn-${index}`} className={className} style={_calculateTransform(buttons.length, index)}>
                            <Button tabIndex={isOpen ? 0 : -1} title={btn.title} radius="full" size="icon" className={btnClasses} asChild
                                onClick={btn.onClick}>
                                {child}
                            </Button>
                            {isOpen && btn.text && <div>{btn.text}</div>}
                        </div>
                    )
                })}
            </nav>
        )
    }

    return (
        <>
            {renderOverlay()}
            <div className={cn("fixed z-50 select-none bottom-0 left-0 right-0 pb-7 text-center pointer-events-none")}>
                {renderButtons()}
                {renderTrigger()}
            </div>
        </>
    )
}
