module.exports = {
  ignorePatterns: [
    ".turbo",
    ".next",
    "dist",
    "node_modules",
    "storybook-static",
    "**/*.cjs",
    "**/*.css",
  ],
  extends: ["turbo", "plugin:prettier/recommended"],
};
