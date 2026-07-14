import reactConfig from "@prefabs.tech/eslint-config/react.js";

export default [
  ...reactConfig,
  {
    files: ["**/__test__/**"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
];
