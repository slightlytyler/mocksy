/* eslint strict: 0 */
'use strict';

const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      app: path.join(__dirname, "app"),
      config: path.join(__dirname, "app/config.js"),
      pods: path.join(__dirname, "app/pods"),
      store: path.join(__dirname, "app/store"),
      containers: path.join(__dirname, "app/containers"),
      components: path.join(__dirname, "app/components"),
      reducers: path.join(__dirname, "app/reducers"),
      constants: path.join(__dirname, "app/constants"),
      api: path.join(__dirname, "app/api"),
      utils: path.join(__dirname, "app/utils"),
      styles: path.join(__dirname, "app/styles")
    },
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
  ]
};
