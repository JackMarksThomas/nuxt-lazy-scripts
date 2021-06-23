# lazy-scripts

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Enables conditional loading of scripts to your Nuxt.js project straight from the nuxt config.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `lazy-scripts` dependency to your project

```bash
yarn add lazy-scripts # or npm install lazy-scripts
```

2. Add `lazy-scripts` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'lazy-scripts',

    // With options
    ['lazy-scripts', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Jack Marks-Thomas <jackmarksthomas@googlemail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/lazy-scripts/latest.svg
[npm-version-href]: https://npmjs.com/package/lazy-scripts

[npm-downloads-src]: https://img.shields.io/npm/dt/lazy-scripts.svg
[npm-downloads-href]: https://npmjs.com/package/lazy-scripts

[github-actions-ci-src]: https://github.com/JackMarksThomas/nuxt-lazy-scripts/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/JackMarksThomas/nuxt-lazy-scripts/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/JackMarksThomas/nuxt-lazy-scripts.svg
[codecov-href]: https://codecov.io/gh/JackMarksThomas/nuxt-lazy-scripts

[license-src]: https://img.shields.io/npm/l/lazy-scripts.svg
[license-href]: https://npmjs.com/package/lazy-scripts
