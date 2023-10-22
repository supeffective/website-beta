'use client'

import { type HTMLAttributes, useState } from 'react'

type HTMLElementAttrs = HTMLAttributes<HTMLElement>
type ReactMouseEvent = React.MouseEvent<HTMLElement, MouseEvent>
type ReactTouchEvent = React.TouchEvent<HTMLElement>

export type PressType = 'press' | 'longpress'
export type PointerType = 'mouse' | 'touch'
export type TargetType = HTMLElement | null | undefined

export type PressableEvent = {
  type: PressType
  pointerType: PointerType
  event: ReactMouseEvent | ReactTouchEvent
  resolvedTarget: HTMLElement | null
}

export interface PressableConfig {
  onPressing?: (e: PressableEvent) => void
  onPressEnd?: (e: PressableEvent) => void
  onPressCancel?: (e: PressableEvent) => void
  onPress?: (e: PressableEvent) => void
  onLongPress?: (e: PressableEvent) => void
  resolveTarget?: (e: ReactMouseEvent | ReactTouchEvent) => HTMLElement | null
  longPressDelay?: number
  pressEndStateTimeout?: number
  disabled?: boolean
}

interface PressableDataProps {
  onPointerDown?: HTMLElementAttrs['onPointerDown']
  onPointerUp?: HTMLElementAttrs['onPointerUp']
  onPointerLeave?: HTMLElementAttrs['onPointerLeave']
  onTouchStart?: HTMLElementAttrs['onTouchStart']
  onTouchEnd?: HTMLElementAttrs['onTouchEnd']
  onTouchCancel?: HTMLElementAttrs['onTouchCancel']
  [key: string]: HTMLElementAttrs[keyof HTMLElementAttrs] | undefined
  'data-disabled'?: string
}

export interface PressableData {
  props: PressableDataProps
  isPressed: boolean
}

const resolveTarget = (
  fn: PressableConfig['resolveTarget'],
  e: ReactMouseEvent | ReactTouchEvent,
): HTMLElement | null => {
  return fn?.(e) ?? (e.target instanceof HTMLElement ? e.target : null)
}

const setPressDataAttr = (target: TargetType, key: 'pressing' | 'pressEnd', value: PressType | null) => {
  if (!target) {
    return
  }
  if (value === null) {
    delete target.dataset[key]

    return
  }
  target.dataset[key] = value
}

// Inspired in https://zagjs.com/components/react/pressable
export function usePressable({
  onPressing,
  onPress,
  onLongPress,
  onPressCancel,
  onPressEnd,
  resolveTarget: resolveTargetProp,
  longPressDelay = 0,
  pressEndStateTimeout = 500,
  disabled = false,
}: PressableConfig): PressableData {
  const isTouchDevice = 'ontouchstart' in window
  const [pressType, setPressType] = useState<PressType | null>(null)
  const isPressing = pressType !== null
  const [timeMs, setTimeMs] = useState(0)
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null)
  const [pressEndTimer, setPressEndTimer] = useState<number | null>(null)

  const getResolvedTarget = (e: ReactMouseEvent | ReactTouchEvent) => {
    return resolveTarget(resolveTargetProp, e)
  }

  const handlePressStart = (e: ReactMouseEvent | ReactTouchEvent) => {
    const isRightClick = (e as ReactMouseEvent).buttons > 1
    const is2FingerTap = (e as ReactTouchEvent).touches?.length > 1

    if (isRightClick || is2FingerTap || disabled) {
      return
    }

    console.log((e as ReactMouseEvent).button, (e as ReactMouseEvent).buttons, (e as ReactTouchEvent).touches?.length)

    console.log('press start', e.type)
    const target = getResolvedTarget(e)
    setTimeMs(Date.now())
    setPressType('press')
    setPressDataAttr(target, 'pressing', 'press')

    if (longPressTimer) {
      window.clearTimeout(longPressTimer)
    }

    if (pressEndTimer) {
      window.clearTimeout(pressEndTimer)
    }

    if (longPressDelay > 0) {
      setLongPressTimer(
        window.setTimeout(() => {
          setPressType('longpress')
          setPressDataAttr(target, 'pressing', 'longpress')
        }, longPressDelay),
      )
    }

    onPressing?.({
      type: 'press',
      event: e,
      pointerType: e.type === 'touchstart' ? 'touch' : 'mouse',
      resolvedTarget: target,
    })
  }

  const handlePressEnd = (e: ReactMouseEvent | ReactTouchEvent) => {
    const isRightClick = (e as ReactMouseEvent).buttons > 1
    const is2FingerTap = (e as ReactTouchEvent).touches?.length > 1

    if (isRightClick || is2FingerTap || disabled) {
      return
    }

    console.log('press end', e.type)
    if (!isPressing) {
      return
    }

    const target = getResolvedTarget(e)
    const timeElapsed = Date.now() - timeMs
    const pressType = timeElapsed < longPressDelay ? 'press' : 'longpress'
    const pointerType = e.type === 'touchend' ? 'touch' : 'mouse'

    setPressType(null)
    setPressDataAttr(target, 'pressing', null)
    setPressDataAttr(target, 'pressEnd', pressType)

    if (pressEndTimer) {
      window.clearTimeout(pressEndTimer)
    }

    if (longPressTimer && pressType !== 'longpress') {
      window.clearTimeout(longPressTimer)
    }

    if (pressType === 'press') {
      onPress?.({
        type: pressType,
        event: e,
        pointerType: pointerType,
        resolvedTarget: target,
      })
    }

    if (pressType === 'longpress') {
      onLongPress?.({
        type: pressType,
        event: e,
        pointerType: pointerType,
        resolvedTarget: target,
      })
    }

    setPressEndTimer(
      window.setTimeout(() => {
        if (pressEndTimer) {
          window.clearTimeout(pressEndTimer)
        }
        setPressDataAttr(target, 'pressEnd', null)
        onPressEnd?.({
          type: pressType,
          event: e,
          pointerType: pointerType,
          resolvedTarget: target,
        })
      }, pressEndStateTimeout),
    )

    // e.preventDefault()
  }

  const handlePressCancel = (e: ReactMouseEvent | ReactTouchEvent) => {
    const isRightClick = (e as ReactMouseEvent).buttons > 1
    const is2FingerTap = (e as ReactTouchEvent).touches?.length > 1

    if (isRightClick || is2FingerTap || disabled) {
      return
    }

    console.log('press cancel', e.type)
    if (!isPressing) {
      return
    }

    if (longPressTimer) {
      window.clearTimeout(longPressTimer)
    }

    if (pressEndTimer) {
      window.clearTimeout(pressEndTimer)
    }

    const target = getResolvedTarget(e)
    setPressType(null)
    setPressDataAttr(target, 'pressing', null)
    setPressDataAttr(target, 'pressEnd', null)

    onPressCancel?.({
      type: pressType,
      event: e,
      pointerType: e.type === 'touchcancel' ? 'touch' : 'mouse',
      resolvedTarget: target,
    })
  }

  const data: PressableData = {
    props: isTouchDevice
      ? {
          onTouchStart: handlePressStart,
          onTouchEnd: handlePressEnd,
          onTouchCancel: handlePressCancel,
          onTouchMove: handlePressCancel,
          'data-disabled': disabled ? 'true' : undefined,
        }
      : {
          onPointerDown: handlePressStart,
          onPointerUp: handlePressEnd,
          onPointerLeave: handlePressCancel,
          'data-disabled': disabled ? 'true' : undefined,
        },
    isPressed: isPressing,
  }

  return data
}
