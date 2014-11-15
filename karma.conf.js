module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'browserify'],

    files: [
      'specs/**/*.js'
    ],

    exclude: [],

    preprocessors: {
      'specs/**/*.js': ['browserify']
    },

    browserify: {
      transform: [ ['reactify', {'es6': true}], 'sassify' ],
      extensions: ['.js', '.scss'],
      watch: true,
      debug: true
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false
  });
};
