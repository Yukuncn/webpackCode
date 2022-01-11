
/*使用dll技术对某些库（jquery react vue....）进行单独打包
当运行webpack时，默认查找webpack.config.js
需求：需要运行webpack.dll.js
webpack --config webpack.dll.js

*/
const {resolve}=require('path')
const webpack=require('webpack')
module.exports={
    //最终打包生成包的名字 jquery
    //['jquery'] 要打包的库是jquery
    entry:{
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]__[hash:10]'//打包的库向外暴露的内容叫什么名字
    },
    plugins:[
        //帮我们打包生成manifest.json，提供和打包以后的jquery的映射关系
       new webpack.DllPlugin({
           name:'[name]__[hash:10]',//映射库的暴露的内容名称
           path:resolve(__dirname,'dll/manifest.json')//输出的名称
       })
    ],
    mode:'production'
}