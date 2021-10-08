// function def(obj, key, val, enumerable) {
//   Object.defineProperty(obj, key, {
//     value: val,
//     enumerable: enumerable,
//     configurable: true,
//     writable: true
//   })
// }
//
// const data = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// }
// def(data,'b',55,false)
//
// for (let key in data) {
//   console.log(`key=${key}`)
// }