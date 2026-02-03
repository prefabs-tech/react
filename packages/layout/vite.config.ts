import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import pack from "./package.json";

type PackageData = {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const { dependencies = {}, peerDependencies = {} } = pack as PackageData;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `PrefabsTechReactLayout.${format}.js`,
        name: "PrefabsTechReactLayout",
      },
      rollupOptions: {
        external: [
          ...Object.keys(peerDependencies),
          ...Object.keys(dependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@prefabs.tech/react-i18n": "PrefabsTechReactI18n",
            "@prefabs.tech/react-config": "PrefabsTechReactConfig",
            "@prefabs.tech/react-ui": "PrefabsTechReactUi",
            "@prefabs.tech/react-user": "PrefabsTechReactUser",
            react: "React",
            "react-dom": "ReactDom",
            "react-router-dom": "ReactRouterDom",
          },
        },
      },
      target: "esnext",
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
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  };
});
