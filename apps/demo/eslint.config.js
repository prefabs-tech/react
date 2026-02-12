import reactConfig from "@prefabs.tech/eslint-config/react-app.js";

export default [
  ...reactConfig,
  {
    rules: {
      "jsx-a11y/no-autofocus": "off",
      "react-hooks/purity": "off",
    },
  },
];
