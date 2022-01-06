/**
 * 1.运行指令
 * webpack ./src/index.js -o ./build/built.js --mode=development  
 * webpack ./src/index.js -o ./build/built.js --mode=production
 * webpack以./src/index.js为入口文件开始打包，打包输出到./build/built.js
 * 
 * 整体打包环境：是开发环境
 * 结论：
 * 1.webpack能处理js/json资源,不能处理样式文件 图片文件
 * 2.生产环境和开发环境能将es6 module编译成浏览器能识别的模块
 * 3.生产环境和开发环境的区别：生产环境比开发环境多一个压缩js代码
 * **/
import './index.css'
import data from './data.json'
console.log(data)
function add(x,y){
    return x+y;
}
console.log(add(1,2));