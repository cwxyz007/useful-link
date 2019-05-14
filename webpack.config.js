const path = require('path')

const p = (...args) => path.join(__dirname, ...args)

module.exports = env => {
  const debug = env.NODE_ENV === 'development'

  /**
   * @type {import('webpack').Configuration}
   */
  const webpackConfig = {
    entry: [p('src', 'App.jsx')],
    mode: debug ? 'development' : 'production',
    output: {
      path: p('dist'),
      publicPath: 'dist',
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        }
      ]
    }
  }

  return webpackConfig
}
