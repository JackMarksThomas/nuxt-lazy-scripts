const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['lazy-scripts'],
    ...moduleOptions
  }

  if (!options.debug && process.env.NODE_ENV !== 'production') {
    console.log('Debug mode: Skipped importing lazy scripts.')
    return
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'lazy-scripts.js',
    options
  })
}

module.exports.meta = require('../package.json')
