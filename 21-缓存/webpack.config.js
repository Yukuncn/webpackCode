/*
缓存：
babel缓存：让第二次打包更快
cacheDirectory: true
文件资源缓存：
给文件名加hash：每次webpack打包构建时都会生成一个唯一的hash值
问题：因为js和css使用同一个hash值，一旦某个文件变化，全部文件都重新打包，导致所有缓存失效;
解决办法：根据chunk生成的hash值，如果打包来自同一个chunk，hash值一样
问题：js css的hash值还是一样的 因为css在js中被引入，属于同一个chunk


解决方法：contenthash 根据文件内容生成hash，不同的文件hash值一定不一样；让代码上线运行缓存更好使用

*/

const {resolve}=require('path')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')//把css从js中文件提取单个文件所使用的插件
const { postcss } = require('postcss-preset-env')//css兼容性处理
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')//css压缩
const HtmlWebpackPlugin=require('html-webpack-plugin')//处理html资源
//定义nodejs的环境变量，决定browserslist中的那个环境
process.env.NODE_ENV='production'
//复用loader
const commonCssLoader=[
   {
       loader:MiniCssExtractPlugin.loader,
       options:{
        publicPath: '../'//解决MiniCssExtractPlugin生成图片路径不对的问题
       }
    },
    'css-loader',
    //样式兼容性处理
    {   //还需要在package.json中的browserslist指定兼容那些浏览器
        loader:'postcss-loader',
        options:{
            ident:'postcss',
            plugins:()=>[
             require('postcss-preset-env')()]
        }
    }
];
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.[contenthash:10].js',//有缓存不更新，解决方法加hash
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {    //js语法检查
                //在package.json中eslintConfig做哪些检查--》airbnb
                test:/\.js$/,
                exclude:/node_modules/,
                //优先执行
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                  fix:true//自动修复
                }
            },
         {  //以下loader只会匹配一个，注意：不能有两项配置处理同一个类型的文件
             oneOf:[
                {   //处理css
                    test:/\.css$/,
                    use:[...commonCssLoader]
                },
            {
                 //处理less
                 test:/\.less$/,
                 use:[...commonCssLoader,'less-loader']
             },
             /*
             正常来讲一个文件只能被一个loader处理：当一个文件要被多个loader处理，一定要搞清楚lader的执行顺序
             先执行eslint,再执行babel       
             */
             {   //js兼容性处理
                 test:/\.js$/,
                 exclude:/node_modules/,
                 loader:'babel-loader',
                 options:{
                     presets:[
                      [  '@babel/preset-env', 
                          {   
                              useBuiltIns:'usage',
                              corejs:{
                                  version:3
                              },
                              targets:{
                                 chrome:'60',
                                 firefox:'60',
                                 ie:'9',
                                 safari:'10',
                                 edge:'17'
                              }
                          }
                      ]
                     ],
                     //开启babel缓存，第二次构建时会读取之前的缓存，速度更快（假如有100个js，1个发生了变化，它只处理这一个）
                 cacheDirectory: true
                   
                 }
             },
             {
                 //处理图片
                 test:/\.(jpg|png|gif)$/,
                 loader:'url-loader',
                 options:{
                     limit:8*1024, //对小于8k的图片进行base64处理
                     name:'[hash:10].[ext]',//名字取hash的前10位，自动加上扩展名
                     outputPath:'imgs',//指定输出路径,
                     esModule:false
                 }
             },
             {
                 //处理html中的图片
                 test:/\.html$/,
                 loader:'html-loader'
             },
             //处理其他文件
             {
                 exclude:/\.(js|css|less|html|jpg|png|gif)/,
                 loader:'file-loader',
                 options:{
                     outputPath:'media'
                 }
             }
             ]
         }
        ]
    },
    plugins:[
    new MiniCssExtractPlugin({
        filename:'css/built.[contenthash:10].css'//重新设置路径,//有缓存页面和console不更新，解决方法加hash
    }),
    new OptimizeCssAssetsWebpackPlugin(),//压缩了css
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{//html压缩
      collapseWhitespace:true,
      removeComments:true
      }
    })
    ],
    mode:'production',//mode为production会自动压缩js
    devtool:'source-map'
}