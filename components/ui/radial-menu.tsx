'use client'
// @see https://ui.shadcn.com/docs/components/button

import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactElement, ReactNode, useEffect } from 'react'
import { Button } from './button'

type RadialMenuProps = {
  isOpen?: boolean
  radiusOpen?: number
  radiusClosed?: number
  children?: ReactNode
  onTriggerClick?: () => void
  buttons: Array<{
    className?: string
    onClick?: () => void
    href?: string
    children?: ReactElement
    title?: string
    text?: string
  }>
}

export function RadialMenu(props: RadialMenuProps): ReactElement {
  const radiusOpen = props.radiusOpen ?? 60
  const radiusClosed = props.radiusClosed ?? radiusOpen * -1
  const { isOpen, onTriggerClick, buttons, children: overlayContent } = props

  useEffect(() => {
    document.documentElement.classList.toggle('with-open-menu', isOpen)

    return () => {
      document.documentElement.classList.remove('with-open-menu')
    }
  }, [isOpen])

  function renderOverlay() {
    if (!isOpen) {
      return null
    }
    return (
      <div data-state={isOpen ? 'open' : 'closed'} className="radial-menu-overlay">
        {overlayContent}
      </div>
    )
  }

  function renderTrigger() {
    return (
      <Button
        title="Menu"
        tabIndex={0}
        className="radial-menu-trigger"
        data-testid="trigger"
        variant={isOpen ? 'primary' : 'secondary'}
        radius="full"
        size="icon"
        onClick={onTriggerClick}
      >
        {!isOpen && <MenuIcon />}
        {isOpen && <XIcon />}
      </Button>
    )
  }

  function _calculateTransform(totalChildren: number, index: number): { translate: string } | {} {
    const radius = isOpen ? radiusOpen : radiusClosed
    const angle = (Math.PI / (totalChildren - 1)) * index - Math.PI
    const x = radius * Math.cos(angle)
    const y = isOpen ? radius * Math.sin(angle) : radiusOpen - radiusOpen / 5

    return {
      transform: `translate(${x}px, ${y}px)`,
    }
  }

  function renderButtons() {
    return (
      <nav className="radial-menu-nav">
        {buttons?.map((btn, index) => {
          const child = btn.href ? (
            <Link href={btn.href} title={btn.title}>
              {btn.children}
            </Link>
          ) : (
            btn.children
          )
          return (
            <div key={`btn-${index}`} className="radial-menu-item" style={_calculateTransform(buttons.length, index)}>
              <Button
                tabIndex={isOpen ? 0 : -1}
                title={btn.title}
                radius="full"
                size="icon"
                className="radial-menu-btn"
                asChild
                onClick={btn.onClick}
              >
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
    <div className="radial-menu" data-state={isOpen ? 'open' : 'closed'}>
      {renderOverlay()}
      <div className="radial-menu-container">
        {renderButtons()}
        {renderTrigger()}
      </div>
    </div>
  )
}
