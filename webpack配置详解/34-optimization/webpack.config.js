const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const TerserWebpackPlugin=require('terser-webpack-plugin')
/*
 output:出口
 
 
 
 */
module.exports={
    entry:'./src/js/index.js',
    output:{
        //文件名称（指定名称+目录）
        filename:'js/[name].[contenthash:10].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path:resolve(__dirname,'build'),
        chunkFilename:'js/[name].[contenthash:10]_chunk.js'
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
    mode:'production',
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
    },
    optimization:{
        splitChunks:{
            chunks:'all',
            /*
            minSize:30*1024,//分割的chunk最小为30kb
            maxSize:0,//最大没有限制
            minChrunks:1, //要提取的chunk至少被引用一次
            maxAsyncRequest:5, //按需加载时并行加载文件的最大数量
            minInitialRequest:3, //入口js最大并行请求数量为5
            automaticNameDelimiter:'~',//名称连接符，提取时用波浪线连接
            name:true,//可以使用命名规则
            cacheGroups:{//分割chunk的组
              //node_modules文件会被打包到ventors组的chunk中===》ventors~xxx.js
              //满足上边的公共规则：如大小超过30kb，至少被引用一次
              ventors:{
                test:/[\\/node_modules[\\/]]/,
                //打包优先级
                priority:-10
              },
              default:{
                  //要提取的chunk最少被引用两次
                  minChunks:2,
                  priority:-10,
                  //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包
                  reuseExistingChunk:true
              }             
            }*/
        },
         //将当前模块记录其他模块的hash值，单独打包为一个文件runtime
         //解决问题：修改a文件可以导致main.js的hash值变化
        runtimeChunk:{
        name:entrypoint=>`runtime-${entrypoint.name}`
    },    
    minimizer:[
    //配置生产环境的压缩方案：js和css
    TerserWebpackPlugin({
        //开启缓存
        cache:true,  
        //开启多进程打包 
        parallel:true,
        //启用source-map
        sourceMap:true
    })

    ]
    }
}