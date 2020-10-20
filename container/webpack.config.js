const commonConfig = require('microfront-common/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const deps = require("./package.json").dependencies;

const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env, argv) => {
  const config = commonConfig[argv.mode]();
  return merge(config, {
    entry: './src/index.ts',
    devServer: {
      port: 3000,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app_container',
        remotes: {
          'app_login': 'app_login@http://localhost:3001/remoteEntry.js',
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

