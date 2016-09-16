process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const config = require('../../../webpack.config')

const then = (error, stats) => {}

module.exports = webpack(config).run(then)
