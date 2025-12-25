export default {
  development: 'http://localhost:1337',
  production: '/api'
}[process.env.NODE_ENV] || '/api'
