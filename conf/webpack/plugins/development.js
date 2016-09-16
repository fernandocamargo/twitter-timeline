const webpack = require('webpack')
const html = require('html-webpack-plugin')

module.exports = (settings) => {
  return [
    new html({template: settings.paths.index, inject: false}),
    new webpack.HotModuleReplacementPlugin()
  ]
}
