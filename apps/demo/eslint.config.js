import reactConfig from "@prefabs.tech/eslint-config/react-app.js";

export default [
  ...reactConfig,
  {
    rules: {
      "@eslint-react/purity": "off",
      "jsx-a11y/no-autofocus": "off",
      "react-hooks/purity": "off",
    },
  },
  {
    files: ["**/__test__/**"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
];
