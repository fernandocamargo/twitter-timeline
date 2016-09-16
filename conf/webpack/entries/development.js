module.exports = (settings) => {
  return {
    [`${settings.paths.assets}/css/app.css`]: [
      './scss/app.scss'
    ],
    js: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './js/client/app.js'
    ]
  }
}
