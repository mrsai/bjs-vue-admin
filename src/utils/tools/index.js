/**
 * 判断某个对象是否包含某个属性
 * @param {Object} obj 一个对象
 * @param {String} propertyName 属性名称 
 * @returns Boolean
 * @example
 * hasProperty({a: 1}, 'a') // true
 * hasProperty({a: 1}, 'b') // false
 */
export function hasProperty(obj, propertyName) {
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
}

/**
 * 深度克隆对象
 * @param {*} data 
 * @returns 
 * 这个clone 有一些限制，不过在业务组件中使用还是基本OK的。
 * 而且应该比递归 copy 要快一些。
 */
export function deepClone(data){
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error('deepClone error');
  }
}