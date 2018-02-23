const path = require('path');

module.exports = {
  entry: './public/jsx/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/js')
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ["transform-react-jsx"] // babelのtransform-react-jsxプラグインを使ってjsxを変換
      }
    }]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
};