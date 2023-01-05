const path = require('path');

module.exports = {
  entry: './src/modules/storage.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules:[
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
}
