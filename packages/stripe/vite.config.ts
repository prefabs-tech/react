import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

import { dependencies, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `PrefabsTechReactStripe.${format}.js`,
        name: "PrefabsTechReactStripe",
      },
      rollupOptions: {
        external: [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@prefabs.tech/react-form": "PrefabsTechReactForm",
            "@prefabs.tech/react-i18n": "PrefabsTechReactI18n",
            "@prefabs.tech/react-ui": "PrefabsTechReactUi",
            axios: "Axios",
            react: "React",
            "react-dom": "ReactDom",
            "react-router-dom": "ReactRouterDom",
          },
        },
      },
      target: "esnext",
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
      },
    },
    server: {
      port: Number(process.env.VITE_APP_PORT) || 8889,
    },
  };
});
