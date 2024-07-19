import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      // ...other options
      output: {
        assetFileNames: "[name].[ext]", // Preserve original file names
      },
    },
  },
});
