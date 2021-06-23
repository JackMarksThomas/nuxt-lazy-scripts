const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...this.options['lazy-scripts'],
    ...moduleOptions
  }

  if (!options.debug && process.env.NODE_ENV !== 'production') {
    return
  }

  // eslint-disable-next-line no-console
  console.info('Debug mode: Importing lazy scripts.')

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'lazy-scripts.js',
    options
  })
}

module.exports.meta = require('../package.json')
