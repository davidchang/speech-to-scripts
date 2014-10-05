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
      {test: /\.js$/, loader: 'es6-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},

      // compile and include less files
      {test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'},

      // allow less files to load urls pointing to font assets
      // @TODO: figure out why this is necessary and do it better
      {test: /\.(woff|ttf|eot|svg)$/, loader: 'file-loader' }
    ]
  },

  resolve : {
    alias : {
      common : __dirname + '/common',
      styles : __dirname + '/styles/styles.less'
    },
    extensions: ['', '.js', '.jsx']
  }
};