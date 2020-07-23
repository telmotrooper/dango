module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "prefer-const": "warn",
    "semi": ["warn", "never"],
    "quotes": ["warn", "double", {"avoidEscape": true}],
    "keyword-spacing": ["warn", { "before": true }],
    "no-extra-parens": ["warn", "all"],
    "react/no-unescaped-entities": "off",
    "react/display-name": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
