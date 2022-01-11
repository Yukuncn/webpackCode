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
    },
    module:{
         rules:[
             //多个loader
             {
                 test:/\.css$/,
                 //多个loader用use
                 use:[
                     'style-loader',
                     'css-loader'
                 ]
             }
         ]
    },
    plugins:[
       new HtmlWebpackPlugin()
    ],
    mode:'development',
    //解析模块的规则
    resolve:{
      //配置解析模块路径别名,解决有些路径很深的问题,可以简写路径，缺点：写路径没有提示了
      alias:{
          $css:resolve(__dirname,'src/css')
      },
      //配置省略文件路径的后缀名,也就是可以省略引入时的后缀名
      extensions:['.js','.json','.css'],
      //告诉webpack解析模块去找哪个目录
      modules:[resolve(__dirname,'../../node_modules'),'node_modules'] 
    }
}