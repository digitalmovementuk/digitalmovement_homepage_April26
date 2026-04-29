import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On GitHub Pages the project is served under /<repo-name>/, so we use
// that as the base for production builds. Locally Vite ignores `base`
// during `vite dev` so localhost still works at /.
export default defineConfig({
  plugins: [react()],
  base: "/digitalmovement_homepage_April26/",
  server: {
    port: 5180,
    host: true,
    strictPort: true,
  },
});
