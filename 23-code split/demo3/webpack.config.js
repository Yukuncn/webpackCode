const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')//处理html资源
//定义nodejs的环境变量，决定browserslist中的那个环境
process.env.NODE_ENV='production'
module.exports={
    entry:'./src/js/index.js',
    output:{
        //[name]代表取文件名
        filename:'js/[name].[contenthash:10].js',//有缓存不更新，解决方法加hash
        path:resolve(__dirname,'build')
    },
    plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{//html压缩
      collapseWhitespace:true,
      removeComments:true
      }
    })
    ],
    /*
    代码分割(适用于单页面)
    1.可以将node_modules代码，单独打包成一个chunk,最终输出；
    */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
    mode:'production',//mode为production会自动压缩js
}