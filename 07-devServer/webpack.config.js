const {resolve}=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //打包其他资源(除了html/js/css资源以外的资源)
            {
                exclude:/\.(css|html|js)$/,//排除html/js/css资源
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]'
                }
            }

        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    //开发服务器devServer：用来自动编译，自动打开浏览器，自动刷新浏览器；特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：npx webpack-dev-server，记得要下载这个包
    devServer:{
       contentBase:resolve(__dirname,'build'),//我要运行的项目的目录
       compress:true,//启动gzip压缩，让我们代码体积更小，运行更快，
       port:3000,//指定开发服务器的端口号
       open:true//自动代开本地默认浏览器
    }


}