/**
 * 处理对象
 * 拦截处理 obj 中的每一个属性, 并在原有 setter getter 方法 基础上 新增一些功能.
 * @param obj
 * @param key
 * @param val
 */
import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(obj, key, val) {
  const dep = new Dep(); // 闭包中的dep
  
  // 对象好处理, Object.defineProperty() setter getter 拦截就行了.
  // 数组呢?
  
  if (arguments.length === 2) {
    val = obj[key]; // 如果参数数量只有2, 从obj中获取val
  }
  
  // data中属性很多, 也可能嵌套. val是对象. 那么需要observe
  let childOb = observe(val)
  
  Object.defineProperty(obj, key, {
    get() { // obj.a 访问属性 触发getter --> 依赖收集
      console.log(`getter 执行了 key=${key}`)
      console.log(val)
      console.log(`----- getter end -------`)
      
      dep.depend(); // 依赖收集
      if (childOb) {
        childOb.dep.depend();
      }
      
      
      return val;
    },
    set(newValue) { // obj.a = 55 更新属性 触发setter --> 依赖通知
      console.log(`setter 执行了 key=${key}`)
      console.log(newValue)
      console.log(`----- setter end -------`)
      val = newValue
      // setter 更新新值了, 这个新值也可能是个对象
      childOb = observe(val)
      dep.notify(); // 依赖通知
    }
  })
  
}


/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set(target, key, val = '') {
  if (arguments.length !== 3) {
    return;
  }
  const ob = target.__ob__
  defineReactive(target, key, val)
  ob.dep.notify()
  return val
}
