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
                test:/\.less$/,
                //多个loader去处理用use
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            //处理图片资源下载url-loader,其中file-loader是url-loader,问题：默认不处理html中的图片
            {
                test:/\.(jpg|png|gif)$/,
                //只使用一个loader
                loader:'url-loader',
                options:{
                    limit:8*1024,//图片大小小于8k，就会被base64处理；base64优点：页面请求数量少一点，（减轻服务器压力）缺点：图片体积更大
                    //问题：url默认使用es6模块化解析的，而html-loader引入图片是commonjs
                    //解析时就会出问题[object Module]
                    //解决关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                   //给图片进行重命名
                    name:'[hash:10].[ext]'//[hash:10]取图片hash值的前十位[ext]取文件原来的扩展名
                }
            },
            {
                test:/\.html$/,
                //专门负责处理html的img图片的，负责引入这个图片，从而能被url-loader处理
                loader:'html-loader'
            
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'

}