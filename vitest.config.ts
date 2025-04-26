import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.js'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: 'text'
    },
    watch: false
  }
})
