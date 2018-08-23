module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'retranslate.js',
    library: 'retranslate',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'react',
  },
};
