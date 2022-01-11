/**
 *  HMR:hot module replacement:热模块替换 /模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 * 极大的提升构建速度
 * 
 * 样式文件可以使用HMR功能，因为style-loader内部实现了HMR功能自动去做
 * js文件:默认不能使用HMR功能，必须要修改js代码，添加支持HMR功能的代码.注意HMR功能对js来讲，只能处理非入口文件
 * html文件：默认不能使用HMR功能，同时会导致问题：html不能热更新了(不用做HMR功能)
 * 解决这个问题：
 * 修改entry入口，将hmtl引入;
 * ***/
const {resolve}=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:['./src/js/index.js','./src/index.html'],
    output:{
        filename:'js/built.js',//打包后的js放在js文件夹下
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            //loader
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //处理css资源
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //图片资源
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:8*1024,
                    name:'[hash:10].[ext]',
                 //关闭es6模块化
                esModule:false,
                outputPath:'imgs'//打包后的图片放在imgs文件夹下
                },      
            },
            //处理html中的图片资源img
            {
             test:/\.html$/,
             loader:'html-loader'
            },
            //处理其他资源
            {
              exclude:/\.(html|js|css|less|jpg|png|gif)$/,
              loader:'file-loader',
              options:{
                name:'[hash:10].[ext]',
                outputPath:'media'
              }
            }   
        ], 
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true,
        //开启HMR功能,当修改了webpack配置，新配置要想生效，必须重新启动webpack服务，开发环境命令:npx webpack-dev-server
        hot:true
    }
}