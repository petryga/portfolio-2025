import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    // Mirrors vite.config.ts — the app imports everything via "@/...".
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    // jsdom, unlike expenses-tracker/FE's node environment, because these tests
    // render components rather than exercising pure logic.
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      // Report files no test imported, otherwise the percentage only describes
      // the code that happened to be loaded and always looks perfect.
      all: true,
      // Extensions listed explicitly: a bare src/** sweeps in .DS_Store, which
      // the instrumenter then tries to parse as JavaScript.
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        // Vendored shadcn/ui components and their generated hooks are upstream
        // code, regenerated via `npx shadcn add`, so they are not ours to test.
        'src/components/ui/**',
        'src/hooks/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.test.{ts,tsx}',
      ],
    },
  },
});
