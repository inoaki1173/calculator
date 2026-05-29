import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
      '@tests': resolve('tests')
    }
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    globals: true,
    root: fileURLToPath(new URL('./', import.meta.url)),
    setupFiles: ['./tests/setup.ts'],
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  }
})
