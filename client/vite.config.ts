import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, PluginOption } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()] as PluginOption[],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
