module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    indent: ["error", 2],
    semi: ["error", "always"],
    "no-console": "off",
    "no-unused-vars": "error",
    "no-warning-comments": "error",
    "react-hooks/exhaustive-deps": "off",
    "prefer-arrow-callback": "error",
    // Enforce camelCase for variables
    camelcase: ["error", { properties: "always" }],
  },
};
