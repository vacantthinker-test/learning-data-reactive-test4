import {def} from "./util";


const arrayPrototype = Array.prototype; // 获取Array原型
const arrayMethods = Object.create(arrayPrototype); // 根据Array原型, 创建一份新的原型

const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']

// 拦截, 即 保留原有功能, 的基础上, 新增一些功能.
methodsNeedChange.forEach(method => {
  const originalMethod = arrayPrototype[method] // 保留原有方法
  def(arrayMethods, method, function (...args) {
    console.log('---- start this----')
    console.log(this) // 数组使用方法时, this 就是 这个数组
    console.log(args) // 7个方法使用时, 传入的参数
    console.log('---- end this----')
    
    const ob = this.__ob__;
    const result = originalMethod.apply(this, args);
    let inserted = []
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // observeArray从哪里来?
    if(inserted.length > 0) {
        ob.observeArray(inserted)
    }
    
    
    return result;
  }, false)
})

/**
 * 处理 数组
 * @param arr
 */
export function defineArray(arr) {
  Object.setPrototypeOf(arr, arrayMethods) // 设置一个arr 新的原型方法
}