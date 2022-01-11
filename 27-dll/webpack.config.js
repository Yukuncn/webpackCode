//loader:先下载再使用
//plugins 下载 引入 使用
const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const webpack  = require('webpack')
const  AddAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    plugins:[
     new HtmlWebpackPlugin({
      //需求 需要有结构的html文件
      template:'./src/index.html'//复制./src/index.html文件自动引入打包输出的所有资源（js/css）  
    }
     ),//功能：默认创建空的html文件，自动引入打包输出的所有资源（js/css）
     new webpack.DllReferencePlugin({
         manifest:resolve(__dirname,'dll/manifest.json')//告诉webpack哪些库不参与打包，同时使用时的名称也得改,但是不打包，怎么引入呢，add-asset-html-webpack-plugin
     }),
     //将某个文件打包输出出去，自动引入html中
     new AddAssetHtmlWebpackPlugin({
      filepath:resolve(__dirname,'dll/jquery.js')
     })
    ],
    mode:"production"
}