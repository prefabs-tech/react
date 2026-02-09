import reactConfig from "@prefabs.tech/eslint-config/react-app.js";

export default [
  ...reactConfig,
  {
    rules: {
      "react-hooks/purity": "off",
    },
  },
];
