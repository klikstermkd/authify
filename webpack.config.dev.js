var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './app/index.js'
  ],
  output: {
    filename: './public/bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devTool: 'eval'
};