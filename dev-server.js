const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');

const compiler = webpack(config);
const server = new WebpackDevServer({
  hot: true,
  port: 8080,
  static: {
    directory: path.join(__dirname, 'public'),
    publicPath: '/public',
  },
}, compiler);

server.start().catch(err => console.error(err));
