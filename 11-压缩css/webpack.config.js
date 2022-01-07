const {resolve} = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const {postcss} = require ('postcss-preset-env');
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
//压缩css:optimize-css-assets-webpack-plugin
//设置nodejs环境变量 
process.env.NODE_ENV='development';
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve (__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          //使用loader的默认配置'postcss-loader '
          //修改loader配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',//固定写法
              plugins:[require ('postcss-preset-env')()
            ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin ({
      filename: 'css/built.css',
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development',
};
