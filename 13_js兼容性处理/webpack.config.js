const {resolve}=require('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin');
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
          /*
         1.第一种方式： js兼容性处理（下载后边这两个包）：babel-loader  @babel/core  @babel/preset-env 基本兼容性处理(问题：只能转换基本语法（promise不能转换）)
          作用：会将es6以上的语法转换成es5 es5以下的语法，

         2.第二种方式：全部js兼容性处理(暴力方式,下载后边这个包)--->@babel/polyfill(只需要在index.js引入) 问题：我只要解决部分兼容性问题，但是将所有兼容性处代码全部引入，体积太大了
         3.第三种方式：需要兼容处理的就做：按需加载---》core-js
         */
         {   
             test:/\.js$/,
             exclude:/node_modules/,//防止把第三方的包转换了
             loader:'babel-loader',
             options:{
                 //preset(预设)指示babel-loader怎么样做一个处理,默认传@babel/preset-env
                 presets:[[
                    '@babel/preset-env',
                    {
                      useBuiltIns:'usage',//按需加载
                      //指定corejs的版本
                      corejs:{
                          version:3  
                      },
                      //指定兼容性做到哪个版本的浏览器
                      targets:{
                        chrome:'60',
                        firefox:'60',
                        ie:'9',
                        safari:'10',
                        edge:'17'
                      }
                    }
                 ]]
             }
         }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(
           {
                template:'./src/index.html'
           }
        )
    ],
    mode:'development'
}