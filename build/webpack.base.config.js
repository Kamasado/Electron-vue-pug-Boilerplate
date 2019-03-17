const path = require('path')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const translateEnvToMode = env => {
  if (env === 'production') {
    return 'production'
  }
  return 'development'
}

module.exports = env => {
  return {
    target: 'electron-renderer',
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === 'development' }),
      new VueLoaderPlugin()
    ]
  }
}
