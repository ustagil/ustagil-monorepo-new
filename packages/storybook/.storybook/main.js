const path = require("path");

module.exports = {
  stories: [
    {
      directory: "../../ui-atom/**",
      files: "*.stories.*",
      // This config is not being used properly by <Story /> in MDX stories.
      // If it's not needed to have a prefix, removing it will fix the issue
      titlePrefix: "UI Atom",
    },
    // {
    //   directory: "../../ustagil-ui-molecule/src/**",
    //   files: "*.stories.*",
    //   // This config is not being used properly by <Story /> in MDX stories.
    //   // If it's not needed to have a prefix, removing it will fix the issue
    //   titlePrefix: "UI Molecule",
    // },
    // {
    //   directory: "../../ustagil-ui-organism/src/**",
    //   files: "*.stories.*",
    //   // This config is not being used properly by <Story /> in MDX stories.
    //   // If it's not needed to have a prefix, removing it will fix the issue
    //   titlePrefix: "UI Organism",
    // },
    // {
    //   directory: "../../ustagil-ui-template/src/**",
    //   files: "*.stories.*",
    //   // This config is not being used properly by <Story /> in MDX stories.
    //   // If it's not needed to have a prefix, removing it will fix the issue
    //   titlePrefix: "UI Template",
    // },
    // {
    //   directory: "../../ustagil-ui-page/src/**",
    //   files: "*.stories.*",
    //   // This config is not being used properly by <Story /> in MDX stories.
    //   // If it's not needed to have a prefix, removing it will fix the issue
    //   titlePrefix: "UI Page",
    // },
  ],
  addons: [
    // https://storybook.js.org/addons/@storybook/addon-links
    "@storybook/addon-links",
    // https://storybook.js.org/docs/react/essentials/introduction
    "@storybook/addon-essentials",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true, // build stories on demand
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
};
