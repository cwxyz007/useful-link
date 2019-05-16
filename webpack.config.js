const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const p = (...args) => path.join(__dirname, ...args)

module.exports = (env) => {
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
    optimization: {
      minimizer: [new OptimizeCssAssetsPlugin({}), new TerserJSPlugin({ cache: true, sourceMap: true })],
      splitChunks: {
        chunks: 'async'
      }
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: debug ? 'cheap-module-eval-source-map' : 'source-map',
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
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: debug
              }
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }

  return webpackConfig
}
