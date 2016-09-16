const extract = require('extract-text-webpack-plugin')

module.exports = (settings, helpers) => {
  return [
    {
      test: /\.(css|scss)$/i,
      loader: extract.extract(['css', 'sass']),
      exclude: settings.paths.ignore
    },
    {
      test: /\.(js|jsx)$/,
      loaders: ['react-hot', 'babel'],
      exclude: settings.paths.ignore
    },
    {
      test: /\.(png|gif|jpg)$/,
      loader: 'url-loader',
      query: {limit: 8192}
    },
    {
      test: /\.woff$/,
      loader: 'url-loader',
      exclude: settings.paths.ignore,
      query: {limit: 10000, minetype: 'application/font-woff'}
    },
    {
      test: /\.woff2$/,
      loader: 'url-loader',
      exclude: settings.paths.ignore,
      query: {limit: 10000, minetype: 'application/font-woff2'}
    },
    {
      test: /\.ttf$/,
      loader: 'url-loader',
      exclude: settings.paths.ignore,
      query: {limit: 10000, minetype: 'application/octet-stream'}
    },
    {
      test: /\.eot$/,
      loader: 'file-loader',
      exclude: settings.paths.ignore
    },
    {
      test: /\.svg$/,
      loader: 'url-loader',
      exclude: settings.paths.ignore,
      query: {limit: 10000, minetype: 'image/svg+xml'}
    },
    {
      test: /\.json$/,
      loader: 'json',
      exclude: settings.paths.ignore
    }
  ]
}
