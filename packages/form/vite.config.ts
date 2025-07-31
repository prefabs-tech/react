import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import { dependencies, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    build: {
      lib: {
        entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
        fileName: (format) => `PrefabsTechReactForm.${format}.js`,
        name: "PrefabsTechReactForm",
      },
      rollupOptions: {
        external: [
          ...Object.keys(peerDependencies),
          ...Object.keys(dependencies),
        ],
        output: {
          exports: "named",
          globals: {
            "@prefabs.tech/react-config": "PrefabsTechReactConfig",
            "@prefabs.tech/react-ui": "PrefabsTechReactUi",
            "@hookform/error-message": "HookFormErrorMessage",
            "@hookform/resolvers": "HookFormResolvers",
            react: "React",
            "react-debounce-input": "ReactDebounceInput",
            "react-dom": "ReactDom",
            "react-dropzone": "reactDropzone",
            "react-hook-form": "ReactHookForm",
            "react-router-dom": "ReactRouterDom",
            validator: "Validator",
            zod: "zod",
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
