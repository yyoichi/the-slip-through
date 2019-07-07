const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  resolve: { extensions: ['.js', '.ts'] },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    })
  ]
};

const develop = config => {
  return {
    ...config,
    mode: 'development',
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      open: false
    },
    devtool: 'inline-source-map'
  };
};

const production = config => {
  return {
    ...config,
    mode: 'production'
  };
};

module.exports = (args, env) => {
  const mode = (args && args.mode) || (env && env.mode) || 'development';
  switch (mode) {
    case 'development':
      return develop(common);
    case 'production':
    default:
      return production(common);
  }
};
