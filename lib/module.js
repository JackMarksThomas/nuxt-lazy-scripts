const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['lazy-scripts'],
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'lazy-scripts.js',
    options
  })
}

module.exports.meta = require('../package.json')
