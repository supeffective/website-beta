import { type Options, defineConfig } from 'tsup'

const entryPoints: Options[] = [
  {
    entry: {
      index: './src/index.ts',
    },
    outDir: './dist',
    format: ['esm'],
    target: 'es2020',
    ignoreWatch: ['**/dist/**', '**/node_modules/**', '*.test.ts'],
    clean: true,
    dts: true,
    sourcemap: true,
    splitting: true,
    minify: false,
    skipNodeModulesBundle: true,
    external: ['node_modules'],
  },
]

export default defineConfig(entryPoints)
