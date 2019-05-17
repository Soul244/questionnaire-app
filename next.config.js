// next.config.js
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer');

const { ANALYZE } = process.env;

const rules = {
  cssModules: false,
  webpack(config) {
    if (ANALYZE) {
      config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'));
    }
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = withSass(withCSS(rules));
