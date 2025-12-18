const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'countries-smoke-test': './tests/countries-smoke-test.ts',
    'countries-load-test': './tests/countries-load-test.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  optimization: {
    minimize: false,
  },
};
