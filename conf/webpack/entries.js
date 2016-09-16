const environment = require('./../environment')
const environments = {
  development: require('./entries/development'),
  production: require('./entries/production')
}

module.exports = environments[environment]
