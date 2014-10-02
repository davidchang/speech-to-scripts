module.exports = {
  context : __dirname,
  entry : {
    options : './options/webpackEntry.js',
    background : './background/webpackEntry.js'
  },
  output : {
    path: __dirname,
    filename: '[name]/bundle.js'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loaders: ['jsx-loader?harmony&insertPragma=React.DOM']},
      {test: /\.js$/, loader: 'es6-loader'}
    ]
  },

  resolve : {
    alias : {
      common : __dirname + '/common',
    },
    extensions: ['', '.js', '.jsx']
  }
};