import count from './count'
console.log('index.js被加载了')
import('./add').then(({default:add})=>{
    console.log(add(1.,2))
}).catch(

)
console.log(count(3,2))