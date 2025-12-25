const express = require('express')
const logger = require('morgan')
const parser = require('body-parser')
const proxy = require('http-proxy-middleware')
const settings = require('../../../conf/back-end/settings')
const mockTwitterApi = require('./mock-twitter-api')

const {host, port} = settings
const message = `Listening at http://${host}:${port}`
const welcome = console.log.bind(console, message)
const fail = console.log.bind(console)

const setCORS = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  return next()
}

const createServer = (server) => {
  return express()
    .use(parser.urlencoded({extended: true}))
    .use(parser.json())
    .use(logger('dev'))
    .use(setCORS)
    .use('/twitter', mockTwitterApi)
}

const registerRoute = function (route, result) {
  // Skip Twitter route since we're using mock data
  if (route === '/twitter/') {
    return this
  }
  const endpoint = settings.endpoints[route]
  const executable = (typeof endpoint === 'function')
  const options = (executable ? endpoint(result) : endpoint)
  return this.use(route, proxy(options))
}

const createRoute = function (route, index) {
  const payload = settings.dependencies[index]
  const promise = (payload ? payload : Promise.resolve(route))
  return promise.then(registerRoute.bind(this, route))
}

const createEndpoints = (server) => {
  Object
    .keys(settings.endpoints)
    .map(createRoute.bind(server))
  return server
}

const startServer = (server) => server.listen(port, welcome)

module.exports = Promise
  .resolve(createServer())
  .then(createEndpoints)
  .then(startServer)
  .catch(fail)
