const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
/*
 output:出口
 
 
 
 */
module.exports={
    entry:'./src/js/index.js',
    output:{
        //文件名称（指定名称+目录）
        filename:'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,'build'),
        //所有资源引入公共路径的前缀---》路径的前边---》举例：'imgs/a.jpg'--->'/imgs/a.jpg'
        publicPath:'/',
        chunkFilename:'js/[name]_chunk.js',//非入口chunk的名称
        library:'[name]',//打包生成的main.js向外暴露的名称:var main={....}
        libraryTarget:'commonjs'//1.适用于浏览器端，变量名加在window身上 2.也可以为'commonjs'3.值为global，变量名添加到哪个node上
    },
    plugins:[
       new HtmlWebpackPlugin()
    ],
    mode:'development'
}