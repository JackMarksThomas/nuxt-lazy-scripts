const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../') }
  ],
  'lazy-scripts': {
    debug: true,
    scripts: [
      {
        id: 'test-1',
        src: '/scripts/test1.js',
        async: true,
        defer: true,
        scrollPoint: 2000,
        timeout: 10000
      },
      {
        id: 'test-2',
        src: '/scripts/test2.js',
        async: true,
        defer: true,
        scrollPoint: 900
      },
      {
        id: 'test-3',
        src: '/scripts/test3.js',
        async: true,
        defer: true,
        scrollPoint: 300,
        timeout: 5000,
        paths: ['/test']
      }
    ]
  }
}
