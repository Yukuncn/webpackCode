const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
/*
 entry:入口起点
 1.string形式---->./src/js/index.js' 单入口
 打包生成一个chrunk，输出一个bundle文件，filename:'js/[name].js'chunk的名称默认叫main
 2.array形式---->:['./src/js/index.js','./src/js/add.js'] 
 多入口
 所有入口文件最终只生成一个chunk，输出出去只有一个bundle文件
 只有在HMR功能中让html文件热更新生效
 3.object形式
 多入口
 有几个入口文件就形成几个chunk，输出几个bundle
 chunk的名称就是key
 

 通常第一种 第三种 用的比较多
 第二种使用的情况是多入口打包一个情况如下图
 entry:{
        index:['./src/js/index.js','./src/js/count.js']//多个js打包成一个文件
        add:'./src/js/add.js'//形成一个chunk，一个bundle
    },

 */
module.exports={
    entry:{
        index:'./src/js/index.js',
        add:'./src/js/add.js'
    },
    output:{
        filename:'js/[name].js',
        path:resolve(__dirname,'build')
    },
    plugins:[
       new HtmlWebpackPlugin()
    ],
    mode:'development'
}