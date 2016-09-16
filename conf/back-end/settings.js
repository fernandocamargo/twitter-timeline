const querystring = require('querystring')
const request = require('request-promise')

const twitter = 'https://api.twitter.com'
const flickr = 'https://api.flickr.com/services/rest/'

module.exports = {
  host: 'localhost',
  port: 1337,
  dependencies: [
    request({
      method: 'POST',
      uri: `${twitter}/oauth2/token`,
      qs: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: 'Basic bWVjaTllbUI3MjA1Ymo0VzQ0eFFDQVRVNjowR0RKWWFUeDg1bkRwbm9pOHp3R2EwVDdNU1FJT1J0OVJkS3Y2aEFmRFNSb0QzUjRGUA=='
      },
      json: true
    })
  ],
  endpoints: {
    '/twitter/': (payload) => {
      return {
        target: twitter,
        changeOrigin: true,
        headers: {Authorization: `Bearer ${payload.access_token}`},
        pathRewrite: {
          '^/twitter/': '/1.1/'
        }
      }
    },
    '/flickr/': {
      target: flickr,
      changeOrigin: true,
      pathRewrite: (path, origin) => {
        const defaults = {
          api_key: '8c0b66aa83b85673e059853e1d24ea50',
          format: 'json',
          nojsoncallback: 1
        }
        const params = Object.assign(defaults, origin.query)
        const query = querystring.stringify(params)
        return `?${query}`
      }
    }
  }
}
