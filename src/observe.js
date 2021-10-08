/**
 * 1 value是不是对象, 是对象, 继续进行.
 * 2 判断value.__ob__ 属性存在不存在, 不存在new 一个
 * @param value
 */
import Observer from "./Observer";

export default function observe(value) {
  if (typeof value !== 'object') { // 如果value不是object, 那么不做处理
    return; // value 是 数值 字符串, 不做处理, 退出当前方法
  }
  let ob;
  if (value.__ob__ === undefined) { // 如果__ob__属性 没有定义, new一个
    ob = new Observer(value)
  } else {
    ob = value.__ob__;
  }
  return ob;
}