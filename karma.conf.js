module.exports = function(config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['jasmine'],
    files: [
      'dist/js/**.js',
      'tests/unit/**.js'
    ],
    client: {captureConsole: false}
  });
};