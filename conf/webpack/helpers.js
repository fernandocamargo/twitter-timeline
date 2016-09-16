module.exports = (settings) => {
  const methods = {
    concat: function (stack, key) {
      return stack.concat(this[key])
    },
    flatten: (object) => {
      return Object.keys(object).reduce(methods.concat.bind(object), [])
    },
    static: (path) => {
      return {from: `./${path}`, to: `./${settings.paths.assets}/${path}`}
    },
    wildcard: extension => `**/*.${extension}`
  }
  return methods
}
