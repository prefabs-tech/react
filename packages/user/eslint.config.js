import reactConfig from "@prefabs.tech/eslint-config/react.js";

export default [
  ...reactConfig,
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
            camelCase: true,
          },
        },
      ],
    },
  },
];
