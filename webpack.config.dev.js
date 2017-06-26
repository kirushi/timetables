var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dev', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    port: 4000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.scss$/, exclude: /node_modules/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.(jpg|jpeg|gif|png|svg)$/,exclude: /node_modules/,loader: 'url-loader?limit=1024&name=./img/[name].[ext]'},
      {test: /\.(woff|woff2|eot|ttf)$/,exclude: /node_modules/,loader: 'url-loader?limit=1024&name=./fonts/[name].[ext]'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
};
