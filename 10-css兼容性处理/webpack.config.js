const {resolve} = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const {postcss} = require ('postcss-preset-env');
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
          /*
                    css兼容性处理：postcss--->postcss-loader  postcss-preset-env:帮助postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                    "browserslist":{
                        //开发环境---设置nodejs环境变量process.env.NODE_ENV=development
                  "development":[
                     "last 1 chrome version",
                     "last 1 firefox version",
                      "last 1 safari version "
                                ],
                                //nodejs生产环境（默认）
                "production":[
                      ">0.2%",
                        "no dead",
                     "not op_mini all"
     
                  ]
}
                                 
                    */
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
  ],
  mode: 'development',
};
