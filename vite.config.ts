import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	base: mode === "production" ? "/context-hash-demo/" : "/", // for gh-pages
	plugins: [react(), tailwindcss()],
}));
