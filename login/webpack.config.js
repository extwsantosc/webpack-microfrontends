const commonConfig = require('microfront-common/webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require("./package.json").dependencies;

const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env, argv) => {
  const config = commonConfig[argv.mode]();
  return merge(config, {
    entry: './src/index.ts',
    devServer: {
      port: 3001,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app_login',
        filename: 'remoteEntry.js',
        exposes: {
          './mountable': './src/mountable-main',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  })
};

