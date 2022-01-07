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
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
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
                ]
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
        {
            exclude:/\.(js|css|less|html|jpg|png|gif)/,
            loader:'file-loader',
            options:{
                outputPath:'media'
            }
        }
        ]
    },
    plugins:[
    new MiniCssExtractPlugin({
        filename:'css/built.css'//重新设置路径
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
    mode:'production'//mode为production会自动压缩js
}