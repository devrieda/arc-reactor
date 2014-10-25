module.exports = {
  entry: "./app/main.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass?includePaths[]=' + __dirname + '/app/stylesheets' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  }
};
