/**
 * 深度克隆对象
 * @param { Object | Array } data
 * @returns
 * 这个clone 有一些限制，不过在业务组件中使用还是基本OK的。
 * 而且应该比递归 copy 要快一些。
 */
export function deepClone(data) {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error('deepClone error')
  }
}

/**
 * 一个广度优先遍历的方法
 * @param {*} node
 * @param {*} callback
 * @returns
 */
export function walk(node, callback) {
  if (node && node.length) {
    const tree = [...node]
    while (tree.length) {
      const item = tree.shift()
      if (item.children) {
        tree.push(...item.children)
      }
      if (!callback(item)) {
        return false
      }
    }
  }
}

/**
 * 判断当前是否是开发环境，这个使用了一个函数包裹，主要是因为import.meta.env.DEV和vite强绑定的。
 * 假如有一天不使用vite，可以直接修改这个函数即可。
 * 这里有一个建议，和语言、语法、框架层面无关的内容一定要独立出来。
 * @returns
 */
export function isDev() {
  return import.meta.env.DEV
}

/**
 * 判断变量的类型
 */

export const variate = {
  isBoolean: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]'
  },
  isNumber: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
  },
  isString: function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
  },
  isFunction: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  },
  isNull: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Null]'
  },
  isUndefined: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Undefined]'
  },
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  },
  isEmpty: function (obj) {
    if (obj === null || obj === undefined) {
      return true
    } else if (this.isBoolean(obj) || this.isNumber(obj) || this.isString(obj)) {
      return obj.length === 0
    } else if (this.isObject(obj)) {
      return Object.keys(obj).length === 0
    } else if (this.isArray(obj)) {
      return obj.length === 0
    } else {
      return false
    }
  },
  hasProperty: function (obj, propertyName) {
    return Object.prototype.hasOwnProperty.call(obj, propertyName)
  },
  createEmpty: function () {
    return Object.create(null)
  }
}

/**
 * 设置或者获取元素的 css 变量
 */
export const stylesVar = Object.create(null)
stylesVar.get = function (keys, el = document.documentElement) {
  const stys = getComputedStyle(el)

  if (variate.isString(keys)) {
    return stys.getPropertyValue(keys)
  }

  if (variate.isArray(keys)) {
    const result = []
    keys.forEach((it) => result.push(stys.getPropertyValue(it)))
    return result
  }
}
stylesVar.set = function (props, el = document.documentElement) {
  if (variate.isObject(props)) {
    Object.keys(props).forEach((key) => {
      el.style.setProperty(key, props[key])
    })
  }
}
