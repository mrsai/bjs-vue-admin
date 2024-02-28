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