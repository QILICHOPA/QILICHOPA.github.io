import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 用户站点 QILICHOPA.github.io 部署在根路径。
  base: '/',
})
