/**
 * 定义指定obj 的 key 属性 是否 可以被枚举[遍历]
 * @param obj
 * @param key
 * @param val
 * @param enumerable 如果一个key设置enumerable=false, 在 for(let key in obj) 遍历执行时,
 *                    这个key是遍历不到的.
 */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: enumerable,
    configurable: true,
    writable: true
  })
}