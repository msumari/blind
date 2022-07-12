import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    https: true,
    host: "0.0.0.0",
  },
  plugins: [react(), mkcert(), viteCommonjs()],
  define: {
    "process.env": {},
  },
});
