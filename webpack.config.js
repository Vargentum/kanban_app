var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin')

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: [path.resolve(ROOT_PATH, 'app/main')],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

// npm run build
if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/, //both js & jsx
          loader: 'babel?stage=1', //include with Stage 1 features
          include: path.resolve(ROOT_PATH, 'app') // operate only inside ./app folder
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production') //affected react lib size
        }
      })
    ]
  });
}

// npm start
if(TARGET === 'dev') {
  module.exports = merge(common, {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:9094',
      'webpack/hot/dev-server'
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel?stage=1', 'flowcheck'],
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    }
  });
}