const webpack = require('webpack')
const environment = require('./conf/environment')
const settings = require('./conf/webpack/settings')
const helpers = require('./conf/webpack/helpers')(settings)
const entries = require('./conf/webpack/entries')
const preloaders = require('./conf/webpack/preloaders')
const loaders = require('./conf/webpack/loaders')
const plugins = require('./conf/webpack/plugins')

const production = (environment === 'production')

module.exports = {
  context: settings.paths.src,
  devtool: (production ? 'cheap-module-source-map' : 'eval'),
  entry: entries(settings, helpers),
  output: {
    path: settings.paths.dist,
    filename: '[name]',
    publicPath: './'
  },
  module: {
    preLoaders: preloaders(settings, helpers),
    loaders: loaders(settings, helpers)
  },
  plugins: plugins(settings, helpers),
  browserSync: {
    files: helpers.flatten(settings.extensions).map(helpers.wildcard),
    server: {
      baseDir: settings.paths.dist,
      directory: true
    },
    open: false,
    host: settings.host,
    port: settings.port
  },
  devMiddleware: {
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
}
