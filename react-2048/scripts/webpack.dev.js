const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const getLocalIPs = require('./getLocalIPs');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    inline: true,
    port: 3000,
    after: (_, server) => {
      // Print the local ip if host mode is activated
      if (server.options.host === '0.0.0.0') {
        const ips = getLocalIPs();
        if (ips.length > 0) {
          // eslint-disable-next-line no-console
          console.log(
            `You can also access the development server at http://${ips[0]}:3000`,
          );
        }
      }
    },
  },
};
