const merge = require('lodash/merge')
const browser = require('browser-sync')
const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const hot = require('webpack-hot-middleware')
const config = require('../../../webpack.config')

const bundler = webpack(config)
const middleware = [
  dev(bundler, config.devMiddleware),
  hot(bundler)
]
const defaults = {server: {middleware}}
const settings = merge({}, defaults, config.browserSync)

module.exports = browser(settings)
