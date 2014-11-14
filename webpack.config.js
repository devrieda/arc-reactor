var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var EXAMPLES_DIR = path.resolve(__dirname, 'examples');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function(entries, dir) {
    if (dir === 'build')
      return entries;

    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir)))
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');

    return entries;
  }, {});
}


module.exports = {
  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'examples/__build__',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/,  loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?includePaths[]=' + __dirname + '/app/stylesheets' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.css']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};
