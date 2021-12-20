import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      "/XML_daily.asp": {
        target: "https://cbr.ru/scripts/XML_daily.asp",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
