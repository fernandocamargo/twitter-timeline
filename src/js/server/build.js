process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const config = require('../../../webpack.config')

const then = (error, stats) => {
  if (error) {
    console.error('Webpack build error:', error)
    process.exit(1)
  }

  if (stats) {
    console.log(stats.toString({
      colors: true,
      chunks: false,
      children: false
    }))

    if (stats.hasErrors()) {
      console.error('Build failed with errors')
      process.exit(1)
    }
  }

  console.log('Build completed successfully!')
}

module.exports = webpack(config).run(then)
