const webpack = require('@nativescript/webpack');
const { join } = require('path');

module.exports = env => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  webpack.chainWebpack(config => {
    if (env.unitTesting) {
      // for coverage reports:
      // only when including src "outside" of just the app src,
      // you need to also include plugin src for coverage reports in the coverage instanbul-loader of webpack
      // (otherwise will show "Unknown% ( 0/0 )" coverage)
      config.module
        .rule('istanbul-loader')
        .include.add(join(webpack.Utils.project.getProjectRootPath(), '..', 'nativescript-internal-plugin'));
    }
  });

  return webpack.resolveConfig();
};
