const path = require('path')

module.exports = {
  entry: {
    'ual-primo-search': './src/ual-primo-search.js',
    'react-polyfill': './src/react-polyfill.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
    library: 'ual-primo-search',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, './src')],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['styled-jsx/babel']
        }
      }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './src')],
    extensions: ['.js', '.json', '.jsx', '.css']
  },

  performance: {
    hints: 'warning',
    maxAssetSize: 2000000,
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },

  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  stats: 'errors-only'
}
