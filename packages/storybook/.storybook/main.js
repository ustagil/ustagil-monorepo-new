// import { mergeConfig } from "vite";

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: [
    {
      directory: "../../ui-atom/src/**",
      files: "*.@(mdx|stories.*)",
      titlePrefix: "UI Atom",
    },
    {
      directory: "../../ui-molecule/src/**",
      files: "*.@(mdx|stories.*)",
      titlePrefix: "UI Molecule",
    },
    {
      directory: "../../ui-organism/src/**",
      files: "*.@(mdx|stories.*)",
      titlePrefix: "UI Organism",
    },
    {
      directory: "../../ui-template/src/**",
      files: "*.@(mdx|stories.*)",
      titlePrefix: "UI Template",
    },
    {
      directory: "../../ui-page/src/**",
      files: "*.@(mdx|stories.*)",
      titlePrefix: "UI Page",
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    storyStoreV7: true, // build stories on demand
  },
  webpackFinal(config) {
    return config;
  },
  // async viteFinal(config) {
  //   return mergeConfig(config, {
  //     define: {
  //       "process.env": process.env,
  //     },
  //   });
  // },
  docs: {
    autodocs: true,
  },
};

