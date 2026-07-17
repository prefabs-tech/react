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
        fileName: (format) => `PrefabsTechReactForm.${format}.js`,
        name: "PrefabsTechReactForm",
      },
      rolldownOptions: {
        external: [
          ...Object.keys(peerDependencies),
          ...Object.keys(dependencies),
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
        ],
        output: {
          exports: "named",
          globals: {
            "@hookform/error-message": "HookFormErrorMessage",
            "@hookform/resolvers": "HookFormResolvers",
            "@prefabs.tech/react-config": "PrefabsTechReactConfig",
            "@prefabs.tech/react-ui": "PrefabsTechReactUi",
            react: "React",
            "react-debounce-input": "ReactDebounceInput",
            "react-dom": "ReactDom",
            "react-dropzone": "reactDropzone",
            "react-hook-form": "ReactHookForm",
            "react-router-dom": "ReactRouterDom",
            "react/jsx-dev-runtime": "React",
            "react/jsx-runtime": "React",
            validator: "Validator",
            zod: "zod",
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
