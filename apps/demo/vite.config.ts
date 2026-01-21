import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: process.env.VITE_APP_BASE_PATH || "/",
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            themeColorDark: process.env.VITE_THEME_COLOR || "#000000",
            themeColorLight: process.env.VITE_THEME_COLOR || "#ffffff",
            title: process.env.VITE_APP_TITLE || "React Demo",
          },
        },
        minify: true,
      }),
      viteCompression({
        compressionOptions: {
          level: 9,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      allowedHosts: true,
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
