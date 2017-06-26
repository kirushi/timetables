var webpack = require('webpack');
var path = require('path');
var ExtractCSS = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractCSS('./[name].css'),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.5
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': JSON.stringify('https://calm-fjord-28769.herokuapp.com/api/v1')
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.scss$/, exclude: /node_modules/, loader: ExtractCSS.extract('style-loader', 'css-loader!sass-loader')},
      {test: /\.(jpg|jpeg|gif|png|svg)$/,exclude: /node_modules/,loader: 'url-loader?limit=1024&name=./img/[name].[ext]'},
      {test: /\.(woff|woff2|eot|ttf)$/,exclude: /node_modules/,loader: 'url-loader?limit=1024&name=./fonts/[name].[ext]'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
};
