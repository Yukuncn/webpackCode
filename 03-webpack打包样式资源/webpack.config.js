/*
作用：指示webpack怎么干活，干哪些活（当你运行webpack指令时，会加载里面的配置）
 所有的构建工具都是基于node平台去运行的~模块化默认采用commonJs
*/
//resolve用来拼接绝对路径
const {resolve}=require('path')
module.exports={
    //webpack配置
    entry:'./src/index.js',//入口起点
    //输出
    output:{
        filename:'built.js',//输出的文件名
        path:resolve(__dirname,'build')//输出路径  __dirname代表当前文件webpack.config.js的绝对路径03-webpack打包样式资源，再加上build就成build目录下了
    },
    //loader的位置
    //不同文件得配置不同loader
    module:{
        rules:[
        //详细的loader配置
        {
            test:/\.css$/,//匹配哪些文件,正则式的意思，文件名以.css结尾
            use:[//使用哪些loader进行处理，use数组中执行顺序，从右边到左边按顺序执行
             'style-loader',//创建style标签，将js中的css样式资源插入进去，添加到head中生效
             'css-loader'  //将css文件以字符串的形式变成commonjs的模块，加载到js中，里面是样式字符串，
            ]
        },
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                //将less文件编译成css文件，需要下载less-loader less
                'less-loader'
            ]
        }
        ]
    },
    //plugin配置
    plugins:[
        //详细plugins的配置
    ],
    //模式(开发 生产模式)
    mode:'development'
}
