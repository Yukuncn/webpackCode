/*服务器代码

启动服务器：
//第一种
npm i nodemon -g
nodemon server.js

第二种
node server
*/
const  express=require('express')
const app=express()
app.use(express.static('build',{maxAge:1000*3600}))//把build文件夹暴露出去，最大存活时期
app.listen(3000)//启动服务器，listen端口