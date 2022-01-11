/**
 *  source-map:一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，可以通过映射关系追踪源代码错误）
 *    添加配置项:devtool:'source-map'//最基本的配置
 *    参数[inline-|hidden-|eval-][nonsources-][cheap-[module-]] source-map如下：
 *     source-map：在外部生成source-map,提供错误代码的准确信息，源代码的错误位置，精确到行列
 * 
 *     inline-source-map:在js内部嵌套sourcemap内联，只生成一个文件的sourcemap,提供错误代码的准确信息，源代码的错误位置
 * 
 *     hidden-source-map：外联;提供错误代码的错误原因，没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的位置
 * 
 *     eval-source-map:内联,每一个文件都生成source-map,都在eval;提供错误代码的准确信息，源代码的错误位置
 * 
 *     nosources--source-map:生成一个外部的source-map;提供错误代码的准确信息，但是没有任何源代码信息
 * 
 *     cheap--source-map:生成一个外部的source-map;提供错误代码的准确信息，源代码的错误位置,只精确到行
 * 
 *     cheap-module-source-map:生成一个外部的source-map；提供错误代码的准确信息，源代码的错误位置,只精确到行；module会将一些loader的source的信息也加进来
 * 
 * 内联和外联的区别：1.外部生成了文件 ，内联没有 2.内联构建速度更快
 * 
 * 
 * 如何决定使用哪个：
 * 开发环境：速度快，调试更友好
 * 速度快（eval>inline>cheap>...）
 * eval-cheap-source-map:只能精确到行，所以快
 * eval-source-map：
 * 调试更友好：
 * source-map 包括行 列 
 * cheap-module-source-map  只精确到行
 * cheap-source-map   
 * 
 * 最终结果：eval-source-map (脚手架使用的)/ eval-cheap-module-source-map
 * 生产环境：源代码要不要隐藏
 * 内联会让代码体积变大，所以开发环境不使用内联
 *   nosources--source-map ：全部隐藏
 *    hidden-source-map：值隐藏源代码
 * 
 * 
 * ---》source-map调试更友好---》速度更快cheap-module-source-map
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
    },
    devtool:'cheap--source-map'
}