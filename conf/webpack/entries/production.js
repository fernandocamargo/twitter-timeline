module.exports = (settings) => {
  return {
    [`${settings.paths.assets}/css/app.css`]: [
      './scss/app.scss'
    ],
    [`${settings.paths.assets}/js/app.js`]: [
      './js/client/app.js'
    ]
  }
}
