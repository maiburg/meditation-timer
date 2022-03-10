module.exports = function (config) {
  const options = {
    basePath: 'src',
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      android: {
        base: 'NS',
        platform: 'android'
      },
      ios: {
        base: 'NS',
        platform: 'ios'
      },
      ios_simulator: {
        base: 'NS',
        platform: 'ios',
        arguments: ['--emulator']
      }
    },
    singleRun: process.env.USER === 'runner'
  };

  if (config._NS && config._NS.env && config._NS.env.codeCoverage) {
    options.reporters = (options.reporters || []).concat(['coverage']);
  }

  config.set(options);
};
