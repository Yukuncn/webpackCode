const {resolve}=require('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin');
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            /*语法检查的含义：
            eslint-loader （loader）
             eslint(库) 
             注意：只检查自己的写的源代码，第三方库是不用检查   
             设置检查规则：package-json中eslintConfig中设置:
             "eslintConfig": {
             "extends": "airbnb-base",
              }
             推荐使用的规则是：airbnb
             eslint-config-airbnb-base eslint-plugin-import

            */
            {   test:/\.js$/,
                exclude:/node_modules/,//排除node_modules
                loader:'eslint-loader',
                options:{
                fix:true//是否自动修复格式问题
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(
           {
                template:'./src/index.html'
           }
        )
    ],
    mode:'development'
}