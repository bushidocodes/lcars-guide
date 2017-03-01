const hostname = 'localhost';
const port = '7777';

module.exports = {
  entry: 'mocha-loader!./tests/index.js',
  output: {
    filename: 'test.build.js',
    path: '/tests/',
    publicPath: 'http://' + hostname + ':' + port + '/tests'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  devServer: {
    host: hostname,
    port
  }
};
