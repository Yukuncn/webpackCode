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
    mode:'development'
    


}