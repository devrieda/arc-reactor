var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {

  output: {
    library: 'ReactEditor',
    libraryTarget: 'var'
  },

  module: {
    loaders: [
      { test: /\.js$/,  loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?includePaths[]=' + __dirname + '/app/stylesheets' }
    ]
  },

  externals: {
    react: 'React'
  },

  node: {
    buffer: false
  },

  plugins: plugins

};
