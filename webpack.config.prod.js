var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: './public/bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
  ]
};