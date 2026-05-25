/* EITHERWAY_CHAINLINK_UI_ALIAS */
import path from 'path'
import { fileURLToPath } from 'url'
const __ewDir = path.dirname(fileURLToPath(import.meta.url))
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  resolve: { alias: { '@eitherway/chainlink-ui': path.resolve(__ewDir, 'src/lib/chainlink-ui') } },
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process'],
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
  define: { 'process.env': {} },
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
    cors: true,
    allowedHosts: true,
  },
})
