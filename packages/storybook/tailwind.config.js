module.exports = {
  presets: [
    require("@vercel/examples-ui/tailwind"),
    require("@ustagil/design-system/tailwind"),
  ],
  content: [
    // All the packages that might include stories
    "./node_modules/@vercel/examples-ui/**/*.js",
    "./node_modules/@ustagil/design-system/**/*.js",
    "./node_modules/@ustagil/pages/**/*.js",
  ],
};
