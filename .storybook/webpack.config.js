// load the default config generator.
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.module.rules[1].use[1].options.modules = true;

  return config;
};
