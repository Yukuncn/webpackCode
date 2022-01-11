//loader:先下载再使用
//plugins 下载 引入 使用
const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const { Template } = require('webpack')
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    plugins:[
     new HtmlWebpackPlugin({
      //需求 需要有结构的html文件
      template:'./src/index.html'//复制./src/index.html文件自动引入打包输出的所有资源（js/css）
    
    }
     )//功能：默认创建空的html文件，自动引入打包输出的所有资源（js/css）
   
    ],
    mode:"production",
    externals:{//打包时忽略的对象
        //忽略  库名-- npm 包名
         jquery:'jQuery'
    }
}