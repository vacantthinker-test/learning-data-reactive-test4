# 关于vue2 响应式原理中 两个位置新建dep的原因

---

defineReactive.js
```javascript
export default function defineReactive(obj, key, val) {
  const dep = new Dep();
  
  // ... 剩余部分
}
```
这里的dep为每一个obj中的key创建.

---

Observer.js
```javascript
export default class Observer {
  constructor(value) {
    this.dep = new Dep(); // 每一个Observer实例instance, 都有一个dep属性
    
    // ... 剩余部分
  }
  // ... 剩余部分
}
```
这里的dep为Observer实例创建.

---

end.
