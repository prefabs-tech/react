import reactConfig from "@prefabs.tech/eslint-config/react.js";

export default [
  ...reactConfig,
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/__test__/**"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
];
