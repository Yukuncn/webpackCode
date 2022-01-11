import '../css/iconfont.css'
import '../css/index.less'
import print from './print'
print()
function add(x,y){
    return x+y
}
console.log(add(3,3))
console.log('index被重新加载了')


if(module.hot){//去全局找module.hot这个属性，一旦module.hot=true，说明开启了HMR功能====》让HMR功能代码生效
    module.hot.accept('./print.js',function(){
      //方法会监听print.js变化，一旦发生变化，其他模块不会重新打包构建，会执行后面的回调函数
      print()
    })
}