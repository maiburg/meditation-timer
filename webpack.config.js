const webpack = require('@nativescript/webpack');
const { join } = require('path');

module.exports = env => {
  webpack.init(env);

  webpack.chainWebpack(config => {
    if (env.unitTesting) {
      config.module
        .rule('istanbul-loader')
        .include.add(join(webpack.Utils.project.getProjectRootPath(), '..', 'nativescript-internal-plugin'));
    }
  });

  return webpack.resolveConfig();
};
