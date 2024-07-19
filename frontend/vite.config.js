import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        //target: "http://127.0.0.1:8000",
        target: "http://52.91.39.148:80",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
