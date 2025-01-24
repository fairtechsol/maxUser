import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  // build: {
  //   sourcemap: false,
  //   rollupOptions: {
  //     // ...other options
  //     output: {
  //       assetFileNames: "[name].[ext]", // Preserve original file names
  //     },
  //   },
  // },
});
