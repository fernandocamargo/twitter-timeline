const webpack = require('webpack')
const compression = require('compression-webpack-plugin')
const html = require('html-webpack-plugin')

module.exports = (settings) => {
  return [
    new html({
      minify: {removeComments: true, collapseWhitespace: true},
      template: settings.paths.index,
      inject: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: true}
    }),
    new compression({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.html$|\.css$|\.js$/
    })
  ]
}
