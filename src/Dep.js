let uid = 0
export default class Dep {
  constructor() {
    console.log('Dep 构造器方法 执行了')
    this.id = uid++; // 每次创建一个Dep实例 instance uid加一.
    this.subs = [] // 存放watcher实例
  }
  
  /**
   * 添加子项
   * @param sub
   */
  addSub(sub) {
    this.subs.push(sub)
  }
  
  /**
   * 依赖收集
   */
  depend() {
    // 如果Dep.target有值 watcher值, 并且 this.subs中没有这个 watcher
    if (Dep.target && this.subs.indexOf(Dep.target) === -1) {
      this.addSub(Dep.target)
    }
  }
  
  /**
   * 依赖通知
   */
  notify() {
    const slice = this.subs.slice();
    for (let i = 0; i < slice.length; i++) {
      slice[i].update() // 执行watcher的update方法
    }
  }
}
Dep.target = null // 静态属性 存放目标函数