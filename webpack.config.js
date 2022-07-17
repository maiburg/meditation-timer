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

    config.module
      .rule('scss|component')
      .test(/\.sass$/)
      .use('sass-loader')
      .loader('sass-loader')
      .options({ sassOptions: { indentedSyntax: true } });

    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
      .use('pug-html-loader')
      .loader('pug-html-loader');
  });

  return webpack.resolveConfig();
};
