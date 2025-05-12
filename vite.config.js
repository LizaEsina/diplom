import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; 
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Настройка алиаса '@' на папку 'src'
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Важное изменение
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Proxying:', proxyReq.path)
          })
        }
      }
    }
  }
})