const path = require('path');
const webpack = require('webpack');

// Engage Ward Speed to accelerate rebuilds, but at the cost of sourcemaps
// If you need to engage in combat with bugs, drop out of Warp
const WARP_SPEED_ENGAGED = false;

// Read environment variables to know if we are in dev, test, or prod
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Generate the entry point based on the environment variable
const entry = PRODUCTION
  ? ['babel-polyfill',
    './app/main.jsx']
  : [
    'babel-polyfill',
    './app/main.jsx',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ];

// Uglify and tree shake the bundle if in Production, allow Hot Module Reloading otherwise
const plugins = PRODUCTION
  ? [new webpack.optimize.UglifyJsPlugin()]
  : [new webpack.HotModuleReplacementPlugin()];

// Define a custom WebPack plugin to make the DEVELOPMENT and PRODUCTION values accessible as global variables
//   in application code
plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
);

// Added Facebook instructions to minify production build of React
// https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
if (PRODUCTION) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry,
  context: __dirname,
  devtool: WARP_SPEED_ENGAGED ? 'cheap-module-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      exclude: /node_modules/
    }],
  },
  plugins,
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: PRODUCTION ? '/' : '/public',
    filename: 'bundle.js',
  }
};
