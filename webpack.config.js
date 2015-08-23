var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry : {
    options : './options/index.js',
    background : './background/webpackEntry.js'
  },
  output : {
    path: __dirname,
    filename: '[name]/bundle.js'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      common : __dirname + '/common',
      styles : __dirname + '/styles/styles.less'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // loaders: ['react-hot', 'babel'],
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.jsx$/,
      loaders: ['babel'],
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
