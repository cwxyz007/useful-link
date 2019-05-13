const path = require('path')

const p = (...args) => path.join(__dirname, ...args)

module.exports = env => {
  const debug = env.NODE_ENV === 'development'

  /**
   * @type {import('webpack').Configuration}
   */
  const webpackConfig = {
    entry: p('src', 'index.js'),
    mode: debug ? 'development' : 'production',
    output: {
      path: p('dist'),
      publicPath: 'dist',
      filename: 'index.js'
    }
  }

  return webpackConfig
}
