import path from "path";

const config = {
  stories: [
    {
      directory: path.resolve(__dirname, "../../ui-atom/src"),
      files: "**/*.@(mdx|stories.*)",
      titlePrefix: "UI Atom",
    },
    // {
    //   directory: path.resolve(__dirname, "../../ui-molecule/src"),
    //   files: "**/*.@(mdx|stories.*)",
    //   titlePrefix: "UI Molecule",
    // },
    // {
    //   directory: path.resolve(__dirname, "../../ui-organism/src"),
    //   files: "**/*.@(mdx|stories.*)",
    //   titlePrefix: "UI Organism",
    // },
    // {
    //   directory: path.resolve(__dirname, "../../ui-template/src"),
    //   files: "**/*.@(mdx|stories.*)",
    //   titlePrefix: "UI Template",
    // },
    // {
    //   directory: path.resolve(__dirname, "../../ui-page/src"),
    //   files: "**/*.@(mdx|stories.*)",
    //   titlePrefix: "UI Page",
    // },
  ],
  addons: [
    path.dirname(
      require.resolve(path.join("@storybook/addon-links", "package.json"))
    ),
    path.dirname(
      require.resolve(path.join("@storybook/addon-essentials", "package.json"))
    ),
    path.dirname(
      require.resolve(path.join("@storybook/addon-actions", "package.json"))
    ),
    path.dirname(
      require.resolve(
        path.join("@storybook/addon-interactions", "package.json")
      )
    ),
  ],
  framework: {
    name: path.dirname(
      require.resolve(path.join("@storybook/nextjs", "package.json"))
    ),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config) {
    // config.plugins.push(		new NodePolyfillPlugin({
		// 	includeAliases: ['util']
		// }));
    const babelLoaderRule = config.module.rules.find(
      (rule) => rule.test.toString() === /\.(mjs|tsx?|jsx?)$/.toString()
    );
    // set correct project root
    babelLoaderRule.include = [
      path.resolve(__dirname, "../../ui-atom/src"),
      // path.resolve(__dirname, "../../ui-molecule/src"),
      // path.resolve(__dirname, "../../ui-organism/src"),
      // path.resolve(__dirname, "../../ui-template/src"),
      // path.resolve(__dirname, "../../ui-page/src"),
    ];

    return config;
  },
};
export default config;
