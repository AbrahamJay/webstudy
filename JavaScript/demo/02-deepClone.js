function deepClone (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    const keys = isArray ? undefined : Object.keys(target)
    // for(const key in target) {
    //   cloneTarget[key] = deepClone(target[key], map)
    // }
    forEach(keys || target, (value, key) => {
      // keys有值 表示当前target为对象 此时key值是对象key数组的下标 所以需要把下标转换成value
      if (keys) {
        key = value
      }
      cloneTarget[key] = deepClone(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
function forEach (array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}


/* ---------------------------------------以下为测试代码------------------------------------------ */

const test01 = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [1, 2, 4],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } }
}
test01.test01 = test01
console.time()
const test01copy = deepClone(test01)
// console.log(test01)
// console.log(test01copy)
console.timeEnd()