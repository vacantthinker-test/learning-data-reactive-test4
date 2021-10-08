/**
 * 挂载__ob__属性
 * 根据value的类型, 进行不同的处理
 *    类型2 数组
 *    类型1 对象
 */
import defineReactive from "./defineReactive";
import {def} from "./util";
import observe from "./observe";
import {defineArray} from "./array";
import Dep from "./Dep";

export default class Observer {
  constructor(value) {
    this.dep = new Dep(); // 每一个Observer实例instance, 都有一个dep属性
    
    // 把当前Observer 实例 作为val, 以__ob__为key, 添加至value.
    
    def(value, '__ob__', this, false)
    // def()执行完, value就有了 key=__ob__, value= observer实例 instance
    
    
    if (Array.isArray(value)) { // 根据value的类型
      defineArray(value) // 重新定义数组中的 7个 方法, 重写 原型 方法
      this.observeArray(value) // 处理数组
    } else {
      this.walk(value) // 处理对象
    }
    
  }
  
  /**
   * 处理数组, 每一项都要拦截处理, 数组中的子项可能是对象也能使数值 字符串
   * @param arr
   */
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
  
  /**
   * 处理对象, 每一项都要拦截
   * @param obj
   */
  walk(obj) {
    let keys = Object.keys(obj); // 获取obj 中每一个key 返回数组
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]) // 对每一个key 进行 拦截处理
    }
  }
}