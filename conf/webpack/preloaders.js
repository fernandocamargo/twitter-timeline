module.exports = (settings, helpers) => {
  return [
    {
      test: /\.(js|jsx)$/,
      loaders: ['eslint'],
      exclude: settings.paths.ignore
    }
  ]
}
