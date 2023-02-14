module.exports = {
  presets: [
    require("@ustagil/ui-atom/tailwind"),
    // require("@ustagil/ui-molecule/tailwind"),
    // require("@ustagil/ui-organism/tailwind"),
    // require("@ustagil/ui-template/tailwind"),
  ],
  content: [
    // All the packages that might include stories
    "./node_modules/@ustagil/ui-atom/src/**/*.js",
    // "./node_modules/@ustagil/ui-molecule/src/**/*.js",
    // "./node_modules/@ustagil/ui-organism/src/**/*.js",
    // "./node_modules/@ustagil/ui-template/src/**/*.js",
  ],
};
