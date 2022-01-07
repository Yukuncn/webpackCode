//import  '@babel/polyfill'
const add = (x, y) => x + y;
// 下一行所有的规则都失效
// eslint-disable-next-line
const promise=new Promise((resolve)=>{
    setTimeout(() => {
        console.log('定时器执行完了')
        resolve()
    }, 1000);
})

console.log(promise)
console.log(add(2, 5));
