import { cn } from '@itsjavi/cn'
import styles from './grids.module.scss'
import type { FullGridRecipeProps } from './types'

export function gridRecipe(options: FullGridRecipeProps): string {
  return cn(
    styles.grid,
    [styles.auto, options.autoFill],
    options.cols ? styles[`box-${options.cols}x`] : null,
    options.cols && options.rows ? styles[`box-${options.cols}x${options.rows}`] : null,
    options.size ? styles[options.size] : null,
    options.className,
  )
}
