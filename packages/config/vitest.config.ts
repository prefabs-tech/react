import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig((configEnvironment) =>
  mergeConfig(
    viteConfig(configEnvironment),
    defineConfig({
      test: {
        coverage: {
          provider: "istanbul",
          reporter: ["text", "json", "html"],
        },
        environment: "jsdom",
        globals: true,
      },
    }),
  ),
);
