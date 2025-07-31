module.exports = {
  root: true,
  extends: ["@prefabs.tech/eslint-config/react"],
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
};
