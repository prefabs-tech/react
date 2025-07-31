import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `PrefabsTechReactConfig.${format}.js`,
        name: "PrefabsTechReactConfig",
      },
      rollupOptions: {
        external: ["react"],
        output: {
          exports: "named",
          globals: {
            react: "React",
          },
        },
      },
      target: "esnext",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": new URL("./src/", import.meta.url).pathname,
      },
    },
    server: {
      port: Number(process.env.VITE_APP_PORT) || 8889,
    },
  };
});
