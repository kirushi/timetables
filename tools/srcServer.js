var express = require('express');
var webpack = require('webpack');
var path = require('path');
var open = require('open');
var compression = require('compression');
var config = require('../webpack.config.dev');
var favicon = require('serve-favicon');

/* eslint-disable no-console */
const port = 4000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
