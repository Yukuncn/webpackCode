const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')//处理html资源
//定义nodejs的环境变量，决定browserslist中的那个环境
process.env.NODE_ENV='production'
module.exports={
    entry:{
        //多入口：有一个入口，最终输出就有一个bundle，这种方式在指定多个入口时不灵活
        index:'./src/js/index.js',
        test:'./src/js/test.js',
    },
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
    mode:'production',//mode为production会自动压缩js
}