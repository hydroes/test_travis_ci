module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'dist/js/**.js',
      'tests/unit/**.js'
    ],
    client: {captureConsole: false}
  });
};