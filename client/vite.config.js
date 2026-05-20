import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        cookieRewrite: {
          "localhost": "localhost"
        },
      },
    },
  },

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
