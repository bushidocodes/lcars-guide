const LiveReloadPlugin = require('webpack-livereload-plugin');

// Engage Ward Speed to accelerate rebuilds, but at the cost of sourcemaps
// If you need to engage in combat with bugs, drop out of Warp
const WARP_SPEED_ENGAGED = false;

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  context: __dirname,
  devtool: WARP_SPEED_ENGAGED ? 'cheap-module-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      }],
    }],
  },
  plugins: [
    new LiveReloadPlugin({ appendScriptTag: true }),
  ],
};
