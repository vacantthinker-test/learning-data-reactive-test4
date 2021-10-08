/**
 * 监听一个属性, 触发一个方法
 */
import Dep from "./Dep";

let uid = 0;

/**
 *
 * @param expression 例：dinner.rice
 * @returns {function(*=): *} 返回 根据dinner.rice从obj找到的 属性值
 */
function parsePath(expression) {
  const segments = expression.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  }; // 返回的这一部分就是 this.getter() 函数
}

export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target; // 目标对象
    this.getter = parsePath(expression); // 高阶函数, 解析表达式 expression-> 表达式
    this.callback = callback;
    this.originalValue = this.get(); // 获取原始值
  }
  
  update() {
    console.log('>>>>>>>>>>> update 被调用了.......................')
    // data.dinner.rice = 10;  有新值
    const newValue = this.get();
    const oldValue = this.originalValue;
    
    // 如果新旧值不一样, 或者新值为object, 那么执行callback
    if (newValue !== oldValue || newValue === 'object') {
      // 1 更新原始值
      // 2 执行callback
      this.originalValue = newValue;
      this.callback.call(this.target, newValue, oldValue);
      
    }
  }
  
  /**
   * 获取原始值
   * @returns {undefined}
   */
  get() {
    Dep.target = this;
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj)
    } catch (e) {
      console.log(e)
    } finally {
      Dep.target = null
    }
    
    
    return value;
  }
}
























