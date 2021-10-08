import observe from "./observe";
import Watcher from "./Watcher";

console.log('vue2 数据响应式原理')

// 1 对对象中的属性, 每一个属性进行劫持. 使用Object.defineProperty(obj, key, {})
//    完成.

// 2 使用new Watcher(obj, '属性名', function(){}) 监听一个属性, 属性改变, 触发一个方法


const data = {
  dinner: { // 晚饭
    rice: 5, // 米饭
    meat: 20 // 肉类
  },
  total: 0, // 总计
  drinkType:[
    {name: '0可乐'},
    {name: '1雪碧'},
    {name: '2橙汁'},
  ]
}
window.data = data;
observe(data) // 拦截数据, 响应式处理

// console.log(data.dinner.rice);
// data.drinkType.push({name:'3葡萄汁'}) // 数组原有3个子项都是响应式的, 新增的并没有响应式处理, 需要加上.

//----------------------------------------------
// 方法集合
const methods = {
  incrementRice: function () {
    data.dinner.rice++;
  },
  decrementRice: function () {
    data.dinner.rice--;
  },
  incrementMeat: function () {
    data.dinner.meat++;
  },
  decrementMeat: function () {
    data.dinner.meat--;
  },
}

/**
 * 更新data.total
 */
function updateTotal() {
  data.total = data.dinner.rice + data.dinner.meat;
}

/**
 * 渲染函数
 */
function renderFunc() {
  document.getElementById('app').innerHTML = `
<table>
    <tr>
        <td>米饭</td>
        <td>${data.dinner.rice}</td>
        <td>
            <button @click="incrementRice">+</button>
            <button @click="decrementRice">-</button>
        </td>
    </tr>
    <tr>
        <td>肉类</td>
        <td>${data.dinner.meat}</td>
        <td>
            <button @click="incrementMeat">+</button>
            <button @click="decrementMeat">-</button>
        </td>
    </tr>
    <tr>
        <td>总计</td>
        <td>${data.total}</td>
        <td>
        </td>
    </tr>
</table>
`
}
updateTotal() // 初始化更新total
renderFunc() // 初始化渲染
// click事件监听
document.getElementById('app').addEventListener('click', function(e) {
  const value = e.target.attributes["@click"].value; // incrementRice
  console.log(value)
  let method = methods[value] // 根据incrementRice, 找到对应的方法, 然后执行该方法
  if(method) {
      method() // data.dinner.rice++;
  }
})
//----------------------------------------------

// 实现更新rice值, total自动更新.
new Watcher(data, 'dinner.rice', function (...args) {
  console.log('=========start Watcher ================')
  // data.total = data.dinner.rice + data.dinner.meat;
  // console.log(`data.total: ${data.total}`)
  // console.log(`args: ${args}`)
  updateTotal()
  renderFunc()
  console.log('=========end Watcher ================')
})
new Watcher(data, 'dinner.meat', function (...args) {
  updateTotal()
  renderFunc()
})
// 监听一个属性, 触发一个方法. watcher 完成. finished.

// data.dinner.rice = 10; // = 是 赋值, setter被触发了
// 5+20 -》 25.
// 10 + 20 -> 30
























