import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(mul(2,3))
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));

// 注册serviceworker
// 处理兼容性问题
/* eslint不认识window navigator全局变量，需要修改package.json  eslintconfig:
  "env": {
      "browser": true
    }
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      () => {
        console.log('serviceworker注册成功');
      },
    ).catch(
      () => {
        console.log('serviceworker注册失败');
      },
    );
  });
}
